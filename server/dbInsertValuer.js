import {Subject, User}  from './dataBaseMoedls.js'

export default async function startInsertin(){
    await Subject.create({subject:"Math"});
    await Subject.create({subject:"Physics"});
    await Subject.create({subject:"English"});
    await Subject.create({subject:"Chemistry"});
    await Subject.create({subject:"Biology"});
    await Subject.create({subject:"History"});   
}

// export default async function User(){
//     await User.create({name:"Kerimov Erbol",category:"One-off cleaning"});
//     await User.create({nameOfService:"End of tenancy cleaning",category:"One-off cleaning"});
//     await User.create({nameOfService:"Deep cleaning",category:"One-off cleaning"});
   
//     await User.create({nameOfService:"Office cleaning",category:"Commercial cleaning"});
//     await User.create({nameOfService:"Communal areas cleaning",category:"Commercial cleaning"});
//     await User.create({nameOfService:"Contract cleaning",category:"Commercial cleaning"});
//     await User.create({nameOfService:"Serviced apartment cleaning",category:"Commercial cleaning"});
   
//     await User.create({nameOfService:"Plumber",category:"Tradespeople"});
//     await User.create({nameOfService:"Electrician",category:"Tradespeople"});
//     await User.create({nameOfService:"Carpenter",category:"Tradespeople"});
//     await User.create({nameOfService:"Handyman",category:"Tradespeople"});
//     await User.create({nameOfService:"Gardener",category:"Tradespeople"});

// }


