import sys
import csv

def sort(filename):
    # Categorize each post as either suggesting suicidal 
    # behavior/attempts/ideation/indicator (negative) or 
    # being supportive (positive)
    positive_set = { 'Supportive', 'Indicator' }
    negative_set = { 'Behavior', 'Attempt', 'Ideation' } 

    # Open a file instance and its corresponding CSV Writer
    output_file = open("si_data_sorted.csv", 'w')
    output_writer = csv.writer(output_file, \
        delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

    # Open a context manager for the input file
    with open(filename, 'r') as fn:
        csv_reader = csv.reader(fn, delimiter=',')
        
        # Write the rows into their respective file, based on category
        at_header = True
        for row in csv_reader:
            if at_header:
                output_writer.writerow(row)
                at_header = not at_header
            elif row[2] in positive_set:
                output_writer.writerow([row[0], row[1], "Positive"])
            elif row[2] in negative_set:
                output_writer.writerow([row[0], row[1], "Negative"])
    
    output_file.close()
        

if __name__ == '__main__':
    if len(sys.argv) > 1:
        sort(sys.argv[1])
    else:
        print('ERROR: Missing arg: filename')