import salesService from '../service/sale.service.js'

export const createSale = async (req, res) => {
    const sale = await salesService.createSale(req.body)

    if(!sale) {
        return res.status(400).json({
            status: 'error',
            message: 'create sale is failed',
            error: 'bad request',
        })
    }

    return res.status(200).json({
        status: "success",
        message: "create sale is successfully",
        data: sale
    })
}

export const getAllSales = async (req, res) => {
    const sales = await salesService.getAllSales()
    return res.status(200).json({
        status: "success",
        message: "sales list is successfully",
        data: sales,
    })
}

