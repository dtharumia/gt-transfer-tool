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

df = pd.DataFrame(columns=['state_entry', 'term', 'school_name', 'transfer_class',
                  'transfer_title', 'transfer_level', 'transfer_mingrade', 'gt_class', 'gt_title', 'gt_ch'])

def scrape_transfer_table():
    driver.get('https://oscar.gatech.edu/pls/bprod/wwsktrna.P_find_location')

    # school in US
    driver.find_element("xpath", "//input[@value='Yes']").click()

    state_entry = ""
    term = ""
    school_name = ""
    t_class = ""
    t_title = ""
    t_level = ""
    t_mingrade = ""
    gt_class = ""
    gt_title = ""
    gt_ch = ""

    # goes through all states
    for count_state in range(
            1, 2):
        state = driver.find_element("xpath", '//option[' + str(count_state) + ']')
        state_entry = state.text
        state.click()
        driver.find_element("xpath", '//input[@value="Get State"]').click()

        # goes through all schools
        for count_school in range(
                1, 3):
            school = driver.find_element("xpath", 
                '//option[' + str(count_school) + ']')
            school_name = school.text

            school.click()
            driver.find_element("xpath", '//input[@value="Get School"]').click()

            # goes through all subjects
            for count_subject in range(1, len(driver.find_elements("xpath", "//select[@name='sel_subj']//option")) + 1):
                subject = driver.find_element("xpath", 
                    '//select[@name="sel_subj"]//option[' + str(count_subject) + ']')
                subject.click()
                try:
                    driver.find_element("xpath", 
                        '//select[@name="levl_in"]//option[@value="US"]').click()
                except:
                    f = open("error.txt", "a")
                    f.write(school_name + '\n')
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
                            t_class = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[1]').text
                            t_title = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[2]').text
                            t_level = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[3]').text
                            t_mingrade = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[5]').text
                            df.loc[(len(df.index))] = [state_entry, term, school_name,
                                                    t_class, t_title, t_level, t_mingrade, gt_class, gt_title, gt_ch]
                        except:
                            gt_class = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[2]').text
                            gt_title = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[3]').text
                            gt_ch = driver.find_element("xpath", 
                                '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[4]').text
                            df.loc[(len(df.index))] = [state_entry, term, school_name,
                                                    t_class, t_title, t_level, t_mingrade, gt_class, gt_title, gt_ch]
                    else:
                        break

                # print last row of df
                print(df.tail(1))
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

    df.to_json(os.path.join(sys.path[0], 'all_data_test.json'), orient='records')

def format_search_fields():
    unique_states = df['state_entry'].unique()
    df_states = pd.DataFrame(unique_states, columns=['primary'])
    df_states['secondary'] = ""
    df_states['type'] = "transfer_state"


    unique_gt_class = df['gt_class'].unique()
    df_gt_class = pd.DataFrame(unique_gt_class, columns=['primary'])
    df_gt_class['secondary'] = ""
    df_gt_class['type'] = "gt_class"


    unique_schools = df['school_name'].unique()
    df_schools = pd.DataFrame(unique_schools, columns=['primary'])
    df_schools['secondary'] = ""
    df_schools['type'] = "transfer_school"
    for index, row in df_schools.iterrows():
        df_schools.at[index, 'secondary'] = df.loc[df['school_name'] == row['primary'], 'state_entry'].iloc[0]
    
    df_search = pd.concat([df_states, df_gt_class, df_schools], ignore_index=True)

    df_search.insert(0, 'id', range(0, 0 + len(df_search)))
    df_search['id'] = df_search['id'].astype(str)

    df_search.to_json(os.path.join(sys.path[0], 'search_fields_test.json'), orient='records')

if __name__ == '__main__':
    scrape_transfer_table()
    format_search_fields()

