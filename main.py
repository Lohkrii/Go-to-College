#!/usr/bin/python3

import numpy as np
import json, torch, glob
from torch import nn
from torchvision import datasets
from torch.utils.data import Dataset, DataLoader
from torchvision.transforms import ToTensor, Lambda

class CustomDataset(Dataset):
    def __init__(self, root: str):
        self.data_path = (f"g2c_dataset/{root}/")
        file_list = glob.glob(self.data_path + "*")
        print(file_list)
        self.data = []
        for class_path in file_list:
            class_name = class_path.split("/")[-1]
            for data_path in glob.glob(class_path + "/*.json"):
                self.data.append([data_path, class_name])
        print(self.data)
        self.labels_map = {"eng": 0, "bus": 1, "art": 2}

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        data_path, class_name = self.data[idx]
        data_dict = json.load(open(data_path, 'r'))
        answers = []
        for key in data_dict.keys():
            answers.append(data_dict[key])
        answers = split_list(answers, 5)
        answers = np.array(answers)
        label_id = self.labels_map[class_name]
        tensor_rep = torch.tensor(answers, dtype=torch.long)
        label_id = torch.tensor([label_id], dtype=torch.long)
        return tensor_rep.float(), label_id.long()

def split_list(arr, size):
    arrs = []
    while len(arr) > size:
        piece = arr[:size]
        arrs.append(piece)
        arr = arr[size:]
    arrs.append(arr)
    return arrs

class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()
        self.linear_relu_stack = nn.Linear(5, 1)

    def forward(self, x):
        logits = self.linear_relu_stack(x)
        return logits

def train_loop(dataloader, model, loss_fn, optimizer):
    size = len(dataloader.dataset)
    for batch, (X, y) in enumerate(dataloader):
        pred = model(X)
        print(pred)
        loss = loss_fn(pred, y)
#
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        if batch % 100 == 0:
            loss, current = loss.item(), batch * len(X)
            print(f"loss: {loss:>7f} [{current:>5d}/{size:>5d}]")

def test_loop(dataloader, model, loss_fn):
    size = len(dataloader.dataset)
    test_loss, correct = 0, 0
    with torch.no_grad():
        for X, y in dataloader:
            pred = model(X)
            test_loss += loss_fn(pred, y).item()
            correct += (pred.argmax(1) == y).type(torch.float).sum().item()
    test_loss /= size
    correct /= size
    print(f"Test Error: \n Accuracy: {(100*correct):>0.1f}%, Avg loss: {test_loss:>8f}\n")

if __name__ == "__main__":
    train_dataset = CustomDataset(root="training")
    test_dataset = CustomDataset(root="testing")
    train_dataloader = DataLoader(train_dataset, batch_size=5, shuffle=True)
    test_dataloader = DataLoader(test_dataset, batch_size=5, shuffle=True)
    for train, category in train_dataloader:
        print("Batch of answers has shape: ", train.shape)
        print("Batch of categories has shape: ", category.shape)
    for test, labels in test_dataloader:
        print("Test batch of tests has shape: ", test.shape)
        print("Labels batch has shape: ", labels.shape)
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    learning_rate = 1e-4
    batch_size = 5
    epochs = 5
    loss_fn = nn.NLLLoss()
    model = NeuralNetwork()
    optimizer = torch.optim.SGD(model.parameters(), lr=learning_rate)
    for t in range(epochs):
        print(f"Epoch {t+1}\n-------------------------------")
        train_loop(train_dataloader, model, loss_fn, optimizer)
        test_loop(test_dataloader, model, loss_fn)
