const generatePNR = () => {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let pnr = "SB";

    for (let i = 0; i < 6; i++) {

        pnr += chars[Math.floor(Math.random() * chars.length)];

    }

    return pnr;

};

export default generatePNR;