import csv, json

csvPath = "small.csv"
jsonPath = "happy.json"

# Read the CSV, add data to dictionary

data = {}
with open(csvPath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for csvRow in csvReader:
        cleaned_hm = csvRow["cleaned_hm"]
        data[cleaned_hm] = csvRow

# Write data to JSON

print(json.dumps(data))