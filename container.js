const data = require('./data');
const DateNow = require('./date');

class GetDataLot {
    constructor(){
        this.AmountLot = 20;
        this.ParkingLot = data.dataparking;
        this.CarIn = [];
    }

    GetDataCarIn = (data) => {
        let car = this.CarIn;
        let parking = this.ParkingLot;
        let found
        for(let i= car.length ; i < parking.length ; i++){
            if(parking[i].status === 'available'){
                found=parking[i].number;
                parking[i].status = 'filled in'
                break;
            }
        }

        Object.assign(data,
            { tanggal_masuk: DateNow.getDateToday()},
            { parking_lot: found}
        )
        const result = data;
        car.push(result);
        return car
    }

    GetDataCarOut = (data) => {
        let car =  this.CarIn;
        let parking =  this.ParkingLot;
        let carOut = []
        for(let i=0 ; i < car.length ; i++){
            if(car[i].plat_nomor === data){
                carOut.push(car[i], DateNow.getDateToday(), car[i].tanggal_masuk );
                parking[i].status = 'available';
                break;
            }
        }
        const totalPay = DateNow.getTotalPay(carOut)
        console.log(carOut)
        console.log(car)
        console.log(totalPay)

        return totalPay
    }

    GetReport = data => {
        let total = 0;
        const car = this.CarIn;
        for(let i = 0; i < car.length ; i++){
            if(car[i].tipe === data){
                total+=1
            }
        }

        return { jumlah_kendaraan: total }
    }

    GetListByColor = data => {
        let plat_nomor = [];
        const car = this.CarIn;
        for(let i = 0; i < car.length ; i++){
            if(car[i].warna === data){
                plat_nomor.push(car[i].plat_nomor)
            }
        }
        
        return plat_nomor
    }
}

let DataLot = new GetDataLot();
module.exports = DataLot;
