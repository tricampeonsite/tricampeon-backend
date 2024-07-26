import axios from "axios";


export const test_proxy = async (req,res) => {
    try {
        const { url } = req.query;

        const request = await axios.get(url);
        const response = await request.data;

        return res.status(200).json({response});
        
    } catch (error) {
        console.error("Ocurrio un error en el proxy. Error:" , error)
        return res.status(500).json({error})
    }
}