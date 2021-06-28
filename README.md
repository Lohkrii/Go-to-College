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
|----------|
| [PyTorch](https://pytorch.org/)|

### API

## Libraries & Functions

### Libraries

|Libraries|Implementation|
|---------|---------|
|[Numpy](https://numpy.org/)| This library was used to manipulate and populate the data that will be passed on to the model.|
|[JSON](https://www.json.org/json-en.html)| The JSON library is used to transfer the data from the quiz to the data prepping console which is then passed on to the model.|
|[glob](https://docs.python.org/3/library/glob.html)| Glob simplifies interactions between files making it easier to work with multiple paths.|

### Methods

|Class|Description|
|-----|-----------|
|CustomDataSet()|| This Method instatiates an object of this class, by setting the data path and classifying said data for it to be loaded into the model.
### Functions

|Function|Description|
|--------|-----------|
|[split\_list()](/main.py)| Splits a given list into nested lists, the size is specified by choosing the ammount of elements each sub-list will contain.|
|[sample\_creator(file_ammt)](/dataset/sample_creator.py)| Creates n file(s) with pre-set data to train and test model.|
|[calculate\_score(arr)](/dataset/sample_creator.py)| Calculates the corresponding concentration.|
|[identify_label(arr)](/dataset/sample_creator.py)| Labels the file with the corresponding name.|

## ML Model

### Model Info

### Dataset

	This model is using 200 test data created from an automatic algorithm in hopes of having the AI learn new non-established patterns and in turn help in the sugeestion fase of the platform.

### Authors

Joshua Lopez - [Github](https://github.com/Lohkrii)
Jaime Martinez - [Github](https://github.com/jemn21819)
