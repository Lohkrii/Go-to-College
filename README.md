# Go to College
 Table of contents

|Overview|Frameworks & API|Libraries & Functions|ML Model|Authors|
|--------|----------------|-------------------|--------|-------|
|[Overall Mechanics](#overall-mechanics)|[Libraries](#libraries)|[Functions](#functions)|[Model Info](#model-info)|[Authors Info](#authors)|
|[Objective](#objective)|[API](#api)|[Methods](#methods)|[Dataset](#dataset)||


## Overview

### Overall Mechanics

### Objective

## Frameworks & API

### Frameworks

|Frameworks|
* [PyTorch](https://pytorch.org/)

### API

## Libraries & Functions

### Libraries

|Libraries|
* [numpy](https://numpy.org/)
* [json](https://www.json.org/json-en.html)
* [glob](https://docs.python.org/3/library/glob.html)
* [pandas](https://pandas.pydata.org/)

### Methods

|Class|Method|Description|
|-----|------|-----------|
|CustomDataSet()|`Python`|
||`def __init__(self):`|
||`    self.data_path = "g2c_dataset/training/"`|
||`    file_list = glob.glob(self.data_path + "*")`|
||`    print(file_list)`|
||`    self.data = []`|
||`    for class_path in file_list:`|
||`        class_name = class_path.split("/")[-1]`|
||`        for data_path in glob.glob(class_path + "/*.json"):`|
||`            self.data.append([data_path, class_name])`|
||`    print(self.data)`|
||`    self.class_map = {"eng": 0, "bus": 1, "art": 2}`| This Method instatiates a an object of this class, by setting the data path and classifying said data for it to be loaded into the model.
### Functions

|Function|Description|
|--------|-----------|
|[split\_list()](/main.py)|Splits a given list into nested lists, the size is specified by choosing the ammount of elements each sub-list will contain.|

## ML Model

### Model Info

### Dataset

	This model is using 200 test data created from an automatic algorithm in hopes of having the AI learn new non-established patterns and in turn help in the sugeestion fase of the platform.

### Authors

Joshua Lopez - [Github](https://github.com/Lohkrii)
Jaime Martinez - [Github](https://github.com/jemn21819)
