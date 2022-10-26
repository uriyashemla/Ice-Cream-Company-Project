# Big Data course - Final Project
<a href="https://ibb.co/BwJ4gGb"><img src="https://i.ibb.co/R7KhCNf/qwd.png" alt="qwd" border="0" /></a>

## :pencil: *Authors of this project:*
| *Nadav Epstein  -  GitHub: https://github.com/Nadav-Eps* | *Uriya Shemla -  GitHub: https://github.com/uriyashemla* |
------------------------------------------------------|----------------------------------------------------
-----------------------------------------------------------------------------------------------------------

## :question: *About the project:*
### In this project we've created a system which simulates ice-cream stores. This system keeps track on purchases on all the stores that our company (easy creamer) has! We can check what is the invetory at each store and also we can predict the sales based on future dates.

*__Stores SIMULATOR:__  Will simulate the stores of Easy Creamer in real time using react,it will be updated by the data he gets from Kafka producer when a purchase is sent, it will be stored in the Redis database service.*

*__Message Broker:__  The kafka prudocer is creating the purchases it will send us the Date, City, Flavour and the Quantity.
Now our two other systems can use it.*

*__Steam Layer:__  The Redis holds our invetory for each city and for each taste, every time he gets a message from the kafka producer it will update the coresponding city and flavour that has been purchased.*

*__Batch Layer:__  This layer responsible for the data of the city (wich pupolation for example) first we loaded one time the data to MySql and then every time we need to use it we will use the Sql table that we loaded. we also loaded the weather and Holidays API with MongoDB and will save all the data of each purchase for the prediction.*

<a href="https://ibb.co/P6FG78j"><img src="https://i.ibb.co/LZYdLfR/2022-10-26-190655.png" alt="2022-10-26-190655" border="0" /></a>

##  *Store Inventory:*
<a href="https://ibb.co/FsHNb0s"><img src="https://i.ibb.co/TKWpBbK/store-Inventory.png" alt="store-Inventory" border="0" /></a>

##  *Total Inventory:*
<a href="https://ibb.co/cy3nx76"><img src="https://i.ibb.co/2Fh45fv/total-Inventory.png" alt="total-Inventory" border="0" /></a>

##  *Prediction:*
<a href="https://ibb.co/1n0YmX0"><img src="https://i.ibb.co/H2KLHPK/prediction.png" alt="prediction" border="0" /></a>
