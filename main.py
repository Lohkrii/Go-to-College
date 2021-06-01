#!/usr/bin/python3

import numpy as np
import json, torch, glob
from torch.utils.data import Dataset, DataLoader

class CustomDataset(Dataset):
    def __init__(self):
        self.data_path = "g2c_dataset/training/"
        file_list = glob.glob(self.data_path + "*")
        print(file_list)
        self.data = []
        for class_path in file_list:
            class_name = class_path.split("/")[-1]
            for data_path in glob.glob(class_path + "/*.json"):
                self.data.append([data_path, class_name])
        print(self.data)
        self.class_map = {"eng": 0, "bus": 1, "art": 2}

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        data_path, class_name = self.data[idx]
        data_dict = json.load(open(data_path))
        answers = []
        for key in data_dict.keys():
            answers.append(data_dict[key])
        shaped_arr = []
        while len(answers) > 5:
            piece = answers[:5]
            shaped_arr.append(piece)
            answers = answers[5:]
        shaped_arr.append(answers)
        shaped_arr= np.array(shaped_arr)
        class_id = self.class_map[class_name]
        tensor_rep = torch.tensor(shaped_arr)
        class_id = torch.tensor([class_id])
        return tensor_rep.float(), class_id.float()

#    def split_list(arr, size):
#        arrs = []
#        while len(arr) > size:
#            piece = arr[:size]
#            arrs.append(piece)
#            arr = arr[size:]
#        arrs.append(arr)
#        return arrs

if __name__ == "__main__":
    dataset = CustomDataset()
    data_loader = DataLoader(dataset, batch_size=2, shuffle=True)
    for train, category in data_loader:
        print("Batch of answers has shape: ", train.shape)
        print("Batch of categories has shape: ", category.shape)
