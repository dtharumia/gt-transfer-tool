from selenium import webdriver
import chromedriver_autoinstaller
import time, os, sys
import pandas as pd
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

chromedriver_autoinstaller.install()

chrome_options = Options()
options = [
    "--headless",
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors",
    "--disable-extensions",
    "--no-sandbox",
    "--disable-dev-shm-usage"
]
for option in options:
    chrome_options.add_argument(option)

driver = webdriver.Chrome(options=chrome_options)

df = pd.DataFrame(columns=['transfer_state', 'term', 'transfer_school', 'transfer_class',
                  'transfer_title', 'transfer_level', 'transfer_mingrade', 'gt_class', 'gt_title', 'gt_ch'])

# get first command line argument
selected_state_number = int(sys.argv[1])

def scrape_transfer_table():
    driver.get('https://oscar.gatech.edu/pls/bprod/wwsktrna.P_find_location')

    # school in US
    driver.find_element("xpath", "//input[@value='Yes']").click()

    transfer_state = ""
    term = ""
    transfer_school = ""
    transfer_class = ""
    transfer_title = ""
    transfer_level = ""
    transfer_mingrade = ""
    gt_class = ""
    gt_title = ""
    gt_ch = ""

    # goes through selected_state
    for count_state in range(
            selected_state_number, selected_state_number + 1):
        state = driver.find_element("xpath", '//option[' + str(count_state) + ']')
        transfer_state = state.text
        print(transfer_state, flush=True)
        state.click()
        driver.find_element("xpath", '//input[@value="Get State"]').click()

        # goes through all schools
        for count_school in range(
                1, 2):
            school = driver.find_element("xpath", 
                '//option[' + str(count_school) + ']')
            transfer_school = school.text

            school.click()
            driver.find_element("xpath", '//input[@value="Get School"]').click()

            # goes through all subjects
            for count_subject in range(1,2):
                subject = driver.find_element("xpath", 
                    '//select[@name="sel_subj"]//option[' + str(count_subject) + ']')
                subject.click()
                try:
                    driver.find_element("xpath", 
                        '//select[@name="levl_in"]//option[@value="US"]').click()
                except:
                    f = open("error.txt", "a")
                    f.write(transfer_school + '\n')
                    f.close()
                    break
                term_sem = driver.find_element("xpath", 
                    '//option[@value="202108"]')
                term_sem.click()
                term = term_sem.text
                driver.find_element("xpath", 
                    '//input[@value="Get Courses"]').click()

                # goes through all courses
                for row in range(3, len(driver.find_elements("xpath", '//table[@class="datadisplaytable"]//tr')) + 1):
                    if driver.find_element("xpath", '//table[@class="datadisplaytable"]//tr[' + str(row) + ']').text != '  ----- No Equivalent Course(s) -----':
                        try:
                            gt_class = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[8]').text
                            gt_title = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[9]').text
                            gt_ch = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[10]').text
                            transfer_class = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[1]').text
                            transfer_title = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[2]').text
                            transfer_level = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[3]').text
                            transfer_mingrade = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[5]').text
                            df.loc[(len(df.index))] = [transfer_state, term, transfer_school,
                                                    transfer_class, transfer_title, transfer_level, transfer_mingrade, gt_class, gt_title, gt_ch]
                        except:
                            gt_class = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[2]').text
                            gt_title = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[3]').text
                            gt_ch = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[4]').text
                            df.loc[(len(df.index))] = [transfer_state, term, transfer_school,
                                                    transfer_class, transfer_title, transfer_level, transfer_mingrade, gt_class, gt_title, gt_ch]
                    else:
                        break

                # print last row of df
                print(df.tail(1), flush=True)
                time.sleep(1)
                
                driver.find_element("xpath", 
                    '//input[@value="Search Another Subject/Level/Term"]').click()
            driver.find_element("xpath", 
                '//input[@value="Search Another School"]').click()

        driver.find_element("xpath", 
            '//input[@value="Search Another State"]').click()

    df.insert(0, 'id', range(0, 0 + len(df)))
    df['id'] = df['id'].astype(str)
    df['gt_ch'] = df['gt_ch'].astype(str)

    df.to_json(os.path.join(sys.path[0], f'output/all_data_test/{selected_state_number}_test.json'), orient='records')

if __name__ == '__main__':
    scrape_transfer_table()


