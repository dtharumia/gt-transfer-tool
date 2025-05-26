import logging
import os
import sys
import time
from datetime import datetime

import pandas as pd
from chromedriver_py import binary_path
from selenium import webdriver
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


class TransferScraper:
    def __init__(self, state_number):
        self.state_number = state_number
        self.driver = self._setup_driver()
        self.wait = WebDriverWait(self.driver, 10)
        self.data = []
        logging.info(f"Initialized scraper for state number {state_number}")

    def _setup_driver(self):
        logging.info("Setting up Chrome driver...")
        options = Options()
        for option in [
            "--headless",
            "--disable-gpu",
            "--window-size=1920,1200",
            "--ignore-certificate-errors",
            "--disable-extensions",
            "--no-sandbox",
            "--disable-dev-shm-usage",
        ]:
            options.add_argument(option)
        return webdriver.Chrome(service=Service(binary_path), options=options)

    def _wait_and_click(self, xpath, max_retries=3):
        for attempt in range(max_retries):
            try:
                logging.info(f"Attempting to click element: {xpath}")
                element = self.wait.until(EC.element_to_be_clickable((By.XPATH, xpath)))
                element.click()
                return element
            except StaleElementReferenceException:
                if attempt == max_retries - 1:
                    logging.error(
                        f"Failed to click element after {max_retries} attempts: {xpath}"
                    )
                    raise
                logging.info(f"Stale element, retrying click: {xpath}")
                time.sleep(1)

    def _wait_and_find(self, xpath, max_retries=3):
        for attempt in range(max_retries):
            try:
                element = self.wait.until(
                    EC.presence_of_element_located((By.XPATH, xpath))
                )
                return element
            except StaleElementReferenceException:
                if attempt == max_retries - 1:
                    logging.error(
                        f"Failed to find element after {max_retries} attempts: {xpath}"
                    )
                    raise
                logging.info(f"Stale element, retrying find: {xpath}")
                time.sleep(1)

    def _get_schools(self):
        logging.info("Getting list of schools...")
        self.wait.until(EC.presence_of_element_located((By.XPATH, "//option")))
        schools = self.driver.find_elements(By.XPATH, "//option")
        logging.info(f"Found {len(schools)} schools")
        return schools

    def _process_course_row(self, row, state, term, school, last_transfer_info=None):
        try:
            logging.info(f"Processing course row {row} for {school}")
            row_xpath = f'//table[@class="datadisplaytable"]//tr[{row}]'
            row_text = self._wait_and_find(row_xpath).text
            if row_text == "  ----- No Equivalent Course(s) -----":
                logging.info("No equivalent courses found")
                return False, last_transfer_info

            # Get all tds in the row
            tds = self.driver.find_elements(By.XPATH, f"{row_xpath}//td")
            # Check for 'And' or 'Or' row (first 5 tds are empty, 6th is 'And' or 'Or')
            is_and_row = (
                len(tds) >= 10
                and all((td.text.strip() == "" for td in tds[:5]))
                and tds[5].text.strip().lower() == "and"
            )
            is_or_row = (
                len(tds) >= 10
                and all((td.text.strip() == "" for td in tds[:5]))
                and tds[5].text.strip().lower() == "or"
            )

            if (is_and_row or is_or_row) and last_transfer_info:
                transfer_class, transfer_title, transfer_level, transfer_mingrade = (
                    last_transfer_info
                )
                rel_type = "And" if is_and_row else "Or"
                logging.info(
                    f"Detected '{rel_type}' row, carrying forward transfer info: {transfer_class}, {transfer_title}"
                )
            else:
                transfer_class = tds[0].text.strip() if len(tds) > 0 else ""
                transfer_title = tds[1].text.strip() if len(tds) > 1 else ""
                transfer_level = tds[2].text.strip() if len(tds) > 2 else ""
                transfer_mingrade = tds[4].text.strip() if len(tds) > 4 else ""
                last_transfer_info = (
                    transfer_class,
                    transfer_title,
                    transfer_level,
                    transfer_mingrade,
                )
                rel_type = "Normal"

            # GT course info (always present in both normal and 'And'/'Or' rows)
            gt_class = tds[7].text.strip() if len(tds) > 7 else ""
            gt_title = tds[8].text.strip() if len(tds) > 8 else ""
            gt_ch = tds[9].text.strip() if len(tds) > 9 else ""

            logging.info(
                f"Found course mapping: {transfer_class} -> {gt_class} ({rel_type})"
            )
            self.data.append(
                {
                    "transfer_state": state,
                    "term": term,
                    "transfer_school": school,
                    "transfer_class": transfer_class,
                    "transfer_title": transfer_title,
                    "transfer_level": transfer_level,
                    "transfer_mingrade": transfer_mingrade,
                    "gt_class": gt_class,
                    "gt_title": gt_title,
                    "gt_ch": gt_ch,
                    "relationship": rel_type,
                }
            )
            return True, last_transfer_info
        except Exception as e:
            logging.error(f"Error processing row {row}: {str(e)}")
            return False, last_transfer_info

    def _wait_for_page_load(self):
        logging.info("Waiting for page to load...")
        self.wait.until(
            lambda driver: driver.execute_script("return document.readyState")
            == "complete"
        )
        logging.info("Page load complete")

    def scrape(self):
        try:
            logging.info("Starting scrape process...")
            self.driver.get(
                "https://oscar.gatech.edu/pls/bprod/wwsktrna.P_find_location"
            )
            self._wait_for_page_load()
            self._wait_and_click("//input[@value='Yes']")

            # Select state
            try:
                state = self._wait_and_find(f"//option[{self.state_number}]")
                state_name = state.text
                logging.info(f"Processing state: {state_name}")
                state.click()
                self._wait_and_click('//input[@value="Get State"]')
                self._wait_for_page_load()
            except Exception as e:
                logging.error(f"Error selecting state: {str(e)}")
                return

            # Process schools
            schools = self._get_schools()
            for school_idx, school in enumerate(schools):
                try:
                    # Refresh school element to avoid stale reference
                    school = self._wait_and_find(f"//option[{school_idx + 1}]")
                    school_name = school.text
                    logging.info(
                        f"Processing school {school_idx + 1}/{len(schools)}: {school_name}"
                    )
                    try:
                        school.click()
                        self._wait_and_click('//input[@value="Get School"]')
                        self._wait_for_page_load()
                    except Exception as e:
                        logging.error(f"Error clicking school {school_name}: {str(e)}")
                        continue

                    # Find the most recent term (first option in <select name='term_in'>)
                    try:
                        term_select = self._wait_and_find('//select[@name="term_in"]')
                        term_options = term_select.find_elements(By.TAG_NAME, "option")
                        if not term_options:
                            logging.error(
                                f"No term options found for {school_name}, skipping school."
                            )
                            self._wait_and_click(
                                '//input[@value="Search Another School"]'
                            )
                            self._wait_for_page_load()
                            continue
                        most_recent_term = term_options[0]
                        most_recent_term_value = most_recent_term.get_attribute("value")
                        most_recent_term_text = most_recent_term.text
                        logging.info(
                            f"Using most recent term: {most_recent_term_text} ({most_recent_term_value})"
                        )
                    except Exception as e:
                        logging.error(
                            f"Error finding/selecting term for {school_name}: {str(e)}"
                        )
                        self._wait_and_click('//input[@value="Search Another School"]')
                        self._wait_for_page_load()
                        continue

                    # Process subjects
                    try:
                        subjects = self.wait.until(
                            EC.presence_of_all_elements_located(
                                (By.XPATH, "//select[@name='sel_subj']//option")
                            )
                        )
                        logging.info(
                            f"Found {len(subjects)} subjects for {school_name}"
                        )
                    except Exception as e:
                        logging.error(
                            f"Error finding subjects for {school_name}: {str(e)}"
                        )
                        self._wait_and_click('//input[@value="Search Another School"]')
                        self._wait_for_page_load()
                        continue

                    for subject_idx, subject in enumerate(subjects):
                        try:
                            # Refresh subject element
                            subject = self._wait_and_find(
                                f'//select[@name="sel_subj"]//option[{subject_idx + 1}]'
                            )
                            subject_name = subject.text
                            logging.info(
                                f"Processing subject {subject_idx + 1}/{len(subjects)}: {subject_name}"
                            )
                            try:
                                subject.click()
                                self._wait_and_click(
                                    '//select[@name="levl_in"]//option[@value="US"]'
                                )
                            except Exception as e:
                                logging.error(
                                    f"Error clicking subject/level for {subject_name}: {str(e)}"
                                )
                                continue

                            # Select the most recent term
                            try:
                                term = self._wait_and_find(
                                    f'//option[@value="{most_recent_term_value}"]'
                                )
                                term_text = term.text
                                logging.info(f"Selected term: {term_text}")
                                term.click()
                                self._wait_and_click('//input[@value="Get Courses"]')
                                self._wait_for_page_load()
                            except Exception as e:
                                logging.error(
                                    f"Error selecting term for {subject_name}: {str(e)}"
                                )
                                continue

                            # Process courses
                            try:
                                rows = self.wait.until(
                                    EC.presence_of_all_elements_located(
                                        (
                                            By.XPATH,
                                            '//table[@class="datadisplaytable"]//tr',
                                        )
                                    )
                                )
                                logging.info(f"Found {len(rows)} rows in course table")
                            except Exception as e:
                                logging.error(
                                    f"Error finding course rows for {subject_name}: {str(e)}"
                                )
                                continue

                            last_transfer_info = None
                            for row in range(3, len(rows) + 1):
                                try:
                                    keep_going, last_transfer_info = (
                                        self._process_course_row(
                                            row,
                                            state_name,
                                            term_text,
                                            school_name,
                                            last_transfer_info,
                                        )
                                    )
                                    if not keep_going:
                                        break
                                except Exception as e:
                                    logging.error(
                                        f"Error processing course row {row} for {subject_name}: {str(e)}"
                                    )
                                    continue

                            logging.info(
                                f"Total courses processed so far: {len(self.data)}"
                            )
                            time.sleep(1)
                            try:
                                self._wait_and_click(
                                    '//input[@value="Search Another Subject/Level/Term"]'
                                )
                                self._wait_for_page_load()
                            except Exception as e:
                                logging.error(
                                    f"Error returning to subject selection for {school_name}: {str(e)}"
                                )
                                break
                        except Exception as e:
                            logging.error(
                                f"Error processing subject {subject_idx + 1} for {school_name}: {str(e)}"
                            )
                            continue

                    try:
                        self._wait_and_click('//input[@value="Search Another School"]')
                        self._wait_for_page_load()
                    except Exception as e:
                        logging.error(
                            f"Error returning to school selection after {school_name}: {str(e)}"
                        )
                        continue
                except Exception as e:
                    logging.error(f"Error processing school {school_idx + 1}: {str(e)}")
                    continue

            # Save results
            logging.info("Saving results to JSON...")
            df = pd.DataFrame(self.data)
            df.insert(0, "id", range(len(df)))
            df["id"] = df["id"].astype(str)
            df["gt_ch"] = df["gt_ch"].astype(str)

            output_dir = os.path.join(sys.path[0], "output/all_data")
            os.makedirs(output_dir, exist_ok=True)
            output_file = os.path.join(output_dir, f"{self.state_number}.json")
            df.to_json(output_file, orient="records")
            logging.info(f"Results saved to {output_file}")

        finally:
            logging.info("Cleaning up...")
            self.driver.quit()
            logging.info("Scrape process completed")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python transfer_table_scrape.py <state_number>")
        sys.exit(1)

    state_number = int(sys.argv[1])
    scraper = TransferScraper(state_number)
    scraper.scrape()
