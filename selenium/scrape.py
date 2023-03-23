# from selenium import webdriver
# import numpy as np
# import pandas as pd
# import time
# from selenium.webdriver.chrome.options import Options
# import os

# DRIVER_PATH = './chromedriver'

# driver = webdriver.Chrome(executable_path=DRIVER_PATH)

# df = pd.DataFrame(columns=['state_entry', 'term', 'school_name', 't_class',
#                   't_title', 't_level', 't_mingrade', 'gt_class', 'gt_title', 'gt_ch'])

# driver.get('https://oscar.gatech.edu/pls/bprod/wwsktrna.P_find_location')

# # school in US
# driver.find_element_by_xpath("//input[@value='Yes']").click()

# # state_entry = ""
# # term = ""
# # school_name = ""
# # t_class = ""
# # t_title = ""
# # t_level = ""
# # t_mingrade = ""
# # gt_class = ""
# # gt_title = ""
# # gt_ch = ""

# # # goes through all states
# # for count_state in range(
# #         1, len(driver.find_elements_by_xpath('//option')) + 1):
# #     state = driver.find_element_by_xpath('//option[' + str(count_state) + ']')
# #     state_entry = state.text
# #     state.click()
# #     driver.find_element_by_xpath('//input[@value="Get State"]').click()

# #     for count_school in range(
# #             1, len(driver.find_elements_by_xpath('//option')) + 1):
# #         school = driver.find_element_by_xpath(
# #             '//option[' + str(count_school) + ']')
# #         school_name = school.text

# #         school.click()
# #         driver.find_element_by_xpath('//input[@value="Get School"]').click()

# #         for count_subject in range(1, len(driver.find_elements_by_xpath("//select[@name='sel_subj']//option")) + 1):
# #             subject = driver.find_element_by_xpath(
# #                 '//select[@name="sel_subj"]//option[' + str(count_subject) + ']')
# #             subject.click()
# #             try:
# #                 driver.find_element_by_xpath(
# #                     '//select[@name="levl_in"]//option[@value="US"]').click()
# #             except:
# #                 f = open("error.txt", "a")
# #                 f.write(school_name + '\n')
# #                 f.close()
# #                 break
# #             term_sem = driver.find_element_by_xpath(
# #                 '//option[@value="202108"]')
# #             term_sem.click()
# #             term = term_sem.text
# #             driver.find_element_by_xpath(
# #                 '//input[@value="Get Courses"]').click()

# #             for row in range(3, len(driver.find_elements_by_xpath('//table[@class="datadisplaytable"]//tr')) + 1):
# #                 if driver.find_element_by_xpath('//table[@class="datadisplaytable"]//tr[' + str(row) + ']').text != '  ----- No Equivalent Course(s) -----':
# #                     try:
# #                         gt_class = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[8]').text
# #                         gt_title = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[9]').text
# #                         gt_ch = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[10]').text
# #                         t_class = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[1]').text
# #                         t_title = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[2]').text
# #                         t_level = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[3]').text
# #                         t_mingrade = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[5]').text
# #                         df.loc[(len(df.index))] = [state_entry, term, school_name,
# #                                                    t_class, t_title, t_level, t_mingrade, gt_class, gt_title, gt_ch]
# #                     except:
# #                         gt_class = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[2]').text
# #                         gt_title = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[3]').text
# #                         gt_ch = driver.find_element_by_xpath(
# #                             '//table[@class="datadisplaytable"]//tr[' + str(row) + ']//td[4]').text
# #                         df.loc[(len(df.index))] = [state_entry, term, school_name,
# #                                                    t_class, t_title, t_level, t_mingrade, gt_class, gt_title, gt_ch]
# #                     finally:
# #                         df.to_csv('rev_data.csv')
# #                         print(df)
# #                 else:
# #                     break
# #             # time.sleep(1)
# #             driver.find_element_by_xpath(
# #                 '//input[@value="Search Another Subject/Level/Term"]').click()
# #         driver.find_element_by_xpath(
# #             '//input[@value="Search Another School"]').click()

# #     driver.find_element_by_xpath(
# #         '//input[@value="Search Another State"]').click()

from selenium import webdriver
import chromedriver_autoinstaller
import time, os, sys
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

driver.get('http://github.com')
print(driver.title)
with open(os.path.join(sys.path[0], 'time.txt'),'w') as f:
    f.write(time.strftime("%H:%M:%S", time.localtime()))    



