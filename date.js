exports.getDateToday = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  let nn = String(today.getMinutes()).padStart(2, "0");

  today = `${yyyy}-${mm}-${dd} ${hh}:${nn}`;

  return today;
};

exports.getTotalPay = data =>{
    let result = {}
    let getHourOut = data[2].slice(10,13)
    let getHourIn = data[1].slice(10,13)
    let getMinuteOut = data[2].slice(13)
    let getMinuteIn = data[1].slice(13)
    let totalHour = 0
    let pricePerHour = 0
    let totalPay = 0

    if((getHourOut-getHourIn) == 0){
        totalHour+=1
    } else if((getMinuteOut-getMinuteIn) == 0){
        totalHour+=1
    } else {
        totalHour = getHourOut - getHourIn
    }

    if(data[0].tipe === 'SUV'){
        pricePerHour = 25000
        totalPay = pricePerHour + ((totalHour-1)*(pricePerHour * 0.2))
    } else if(data[0].tipe === 'MPV'){
        pricePerHour = 35000
        totalPay = pricePerHour + ((totalHour-1)*(pricePerHour * 0.2))
    }

    Object.assign(result, {
        plat_nomor: data[0].plat_nomor,
        tanggal_masuk: data[2],
        tangal_keluar: data[1],
        jumlah_bayar: totalPay
    })

    return result
}
