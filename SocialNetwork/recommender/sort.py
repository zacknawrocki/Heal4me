import sys
import csv

# Separate the composite dataset into categories with their own
# CSV files. The categories are denoted by file_dict keys
def sort(filename):
    file_dict = {
    'Ideation': [
        open('ideation.csv', 'w'),
        None
    ], 
    'Behavior': [
        open('behavior.csv', 'w'),
        None
    ],
    'Attempt': [
        open('attempt.csv', 'w'),
        None
    ]}

    # Open a CSV Writer for each file
    for key in file_dict.keys():
        file_dict[key][1] = csv.writer(file_dict[key][0], 
        delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

    # Open a context manager for the input file
    with open(filename, 'r') as fn:
        csv_reader = csv.reader(fn, delimiter=',')
        
        # Write the rows into their respective file, based on category
        at_header = True
        for row in csv_reader:
            if at_header:
                for key in file_dict.keys():
                    file_dict[key][1].writerow(row)
                at_header = not at_header
            elif row[2] in file_dict.keys():
                file_dict[row[2]][1].writerow(row)

    # Close all files
    for key in file_dict.keys():
        file_dict[key][0].close()
        

if __name__ == '__main__':
    if len(sys.argv) > 1:
        sort(sys.argv[1])
    else:
        print('ERROR: Missing arg: filename')