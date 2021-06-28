#!/usr/bin/python3

import json
import numpy as np

Qw = [3, 2, 0, 1, 2, 0, 2, 1, 2,\
                   3, 0, 2, 1, 2, 3, 0, 2, 1, 2, 3]

Qt = [3, 2, 2, 1, 2, 2, 2, 1, 3,\
                   3, 2, 2, 1, 3, 3, 2, 2, 1, 3, 3]

def sample_creator(file_number):
    arr = np.random.randint(0, 3, size=20)
    arr = arr.tolist()
    print(arr)
    ap_score = calculate_score(arr)
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
    label = identify_label(ap_score)
    with open(f'{file_number}-{label}.json', 'w') as fp:
        json.dump(new_dict, fp)

def calculate_score(arr):
    score_arr = []
    for idx in range(len(arr)):
        score_arr.append(((arr[idx] + Qw[idx]) * Qt[idx]) * 10)
    return score_arr

def identify_label(arr):
    answer_label = ""
    art = 0
    bus = 0
    eng = 0
    for idx in range(len(arr)):
        if idx > 14:
            eng += arr[idx]
        elif idx > 9:
            bus += arr[idx]
        elif idx > 4:
            art += arr[idx]
        print("idx: " + str(idx))
        print("Engineering: " + str(eng))
        print("Art: " + str(art))
        print("Business: " + str(bus))
    print(str(eng) + "\n" + str(bus) + "\n" + str(art))
    if eng > bus and eng > art:
        answer_label = "eng"
    elif art > eng and art > bus:
        answer_label = "art"
    else:
        answer_label = "bus"
    return answer_label

for idx in range(10000):
    sample_creator(idx)
