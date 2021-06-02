#!/usr/bin/python3

import json
import numpy as np

Qw = [3, 2, 0, 1, 2, 0, 3, 2, 0,\
                   0, 2, 3, 0, 1, 1, 0, 2, 1, 3, 3]

Qt = [3, 2, 2, 1, 2, 1, 3, 2, 3,\
                   3, 2, 3, 2, 1, 1, 2, 2, 1, 3, 3]

def sample_creator(file_number):
    arr = np.random.randint(0, 3, size=20)
    arr = arr.tolist()
    print(arr)
    arr = calculate_score(arr)
    new_dict = {}
    for idx in range(len(arr)):
        if idx > 14:
            key = "eng" + str((idx % 15) + 1)
        elif idx > 9:
            key = "bus" + str((idx % 10) + 1)
        elif idx > 4:
            key = "art" + str((idx % 5) + 1)
        else:
            key = "pre" + str(idx + 1)
        new_dict[key] = arr[idx]
    print(new_dict)
    with open(f'{file_number}-example.json', 'w') as fp:
        json.dump(new_dict, fp)

def calculate_score(arr):
    score_arr = []
    for idx in range(len(arr)):
        score_arr.append(((arr[idx] + Qw[idx]) * Qt[idx]) * 10)
    return score_arr

for idx in range(2):
    sample_creator(idx)
