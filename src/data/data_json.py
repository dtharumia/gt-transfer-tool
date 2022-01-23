# import csv 
# import json 

# def csv_to_json(csvFilePath, jsonFilePath):
#     jsonArray = []
      
#     #read csv file
#     with open(csvFilePath, encoding='utf-8') as csvf: 
#         #load csv file data using csv library's dictionary reader
#         csvReader = csv.DictReader(csvf) 

#         #convert each csv row into python dict
#         for row in csvReader: 
#             #add this python dict to json array
#             jsonArray.append(row)
  
#     #convert python jsonArray to JSON String and write to file
#     with open(jsonFilePath, 'w', encoding='utf-8') as jsonf: 
#         jsonString = json.dumps(jsonArray, indent=4)
#         jsonf.write(jsonString)
          
# csvFilePath = r'data_updated.csv'
# jsonFilePath = r'data_updated.json'
# # csv_to_json(csvFilePath, jsonFilePath)

# import hone

# optional_arguments = {
#   "delimiters": ["gt"]
# }
# Hone = hone.Hone(**optional_arguments)
# schema = Hone.get_schema(csvFilePath)  # nested JSON schema for input.csv
# result = Hone.convert(jsonFilePath, schema=schema)  # final structure, nested according to schema

