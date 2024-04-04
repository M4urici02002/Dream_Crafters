const path = require('path');

exports.descargarImagen = (req, res) => {
    const filePath = path.join(__dirname, '../public/reporte/graph.pdf');
    const fileName = 'graph.pdf';

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Error al descargar el pdf:', err);
         
        } else {
            console.log('Descarga exitosa');
        }
    });
};
