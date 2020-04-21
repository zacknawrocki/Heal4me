import sys
import csv

# Separate the composite dataset into categories of posts that sugges either 
# suicidal behavior/attempts/ideation (negative) or supportive/indicator (negative)
def sort(filename):
    positive_set = { "Supportive" }
    negative_set = { "Ideation", "Attempt", "Behavior", "Indicator "}

    file_dict = {
    'positive': [
        open('positive.csv', 'w'),
        None
    ], 
    'negative': [
        open('negative.csv', 'w'),
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
            elif row[2] in positive_set:
                file_dict['positive'][1].writerow(row)
            elif row[2] in negative_set:
                file_dict['negative'][1].writerow(row)

    # Close all files
    for key in file_dict.keys():
        file_dict[key][0].close()
        

if __name__ == '__main__':
    if len(sys.argv) > 1:
        sort(sys.argv[1])
    else:
        print('ERROR: Missing arg: filename')