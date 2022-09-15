import { ICar } from "../../interfaces/ICar"

export const carMock: ICar = {
  "model": "Fox",
  "year": 2013,
  "color": "white",
  "status": false,
  "buyValue": 30000,
  "doorsQty": 4,
  "seatsQty": 5
}

export const carMockWithId: ICar & { _id: string } = {
  "_id": "62cf1fc6498565d94eba52cd",
  "model": "Fox",
  "year": 2013,
  "color": "white",
  "status": false,
  "buyValue": 30000,
  "doorsQty": 4,
  "seatsQty": 5,
}

export const carMockUpdated: ICar & { _id: string } = {
  "_id": "62cf1fc6498565d94eba52cd",
  "model": "Polo",
  "year": 2013,
  "color": "white",
  "status": false,
  "buyValue": 30000,
  "doorsQty": 4,
  "seatsQty": 5,
}

export const listCarsMockWithId: Array<ICar & { _id: string }> = [
  {
  "_id": "62cf1fc6498565d94eba52cd",
  "model": "Fox",
  "year": 2013,
  "color": "white",
  "status": false,
  "buyValue": 30000,
  "doorsQty": 4,
  "seatsQty": 5,
  },
  {
    "_id": "62cf1fc6498565d94eba25cd",
    "model": "HRV",
    "year": 2021,
    "color": "wine",
    "status": false,
    "buyValue": 100000,
    "doorsQty": 4,
    "seatsQty": 5,
  },
]