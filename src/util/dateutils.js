module.exports = {
    dataAgora(){
        const dNow = new Date();
        const dataAtual = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear();        
        return dataAtual;
    }
};