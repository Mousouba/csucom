export interface Data {
    success:boolean,
    user:{ 
        id:number,
        pseudo:string,
        email:string,
        pass:string,
        rang:number,
        register_date:string,
        login_date:string,
        attempt:number,
        etat:number,
        numero:string
    },
    info:{
        totalClient:number,
        totalPrescription:number,
        totalObservation:number,
        totalDeficite:0,
        listeOb:[
            {
                id:number,
                prescription_id:number,
                chambre:number,
                lit:number,
                enter_date:string,
                back_date:string,
                etat:number,
                client_id:number,
                medecin_id:number,
                designation_id:number,
                keyGen:number,
                register_date:string,
                gestionaire_id:number,
                ristourne:number,
                price:number,
                name:string,
                firstname:string,
                sexe:string,
                birth_date:string,
                number:number,
                assure:number,
                tag:string,
                nom:string,
                jr:number,
                ident:number
            }
        ]
    }
}
    