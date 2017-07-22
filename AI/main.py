## compute_input.py

import sys, json as np

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():

    print("Hello world")

#start process
if __name__ == '__main__':
    main()