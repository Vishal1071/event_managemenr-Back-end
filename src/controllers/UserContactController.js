import Contact from "../models/UserContact.js"

export const contact = async (req, res) => {
    try {
        const { fullname, email, phonenumber, messege } = req.body;

        if (!fullname || !email || !phonenumber || !messege) {
            return res.status(400).json({ message: "All fields are require" });
        }

        const contact = new Contact({
            fullname, email, phonenumber, messege
        })

        await contact.save()

        return res.status(201).json({ message: "Contact form submitted successfully!", contact})
    } catch (error) {
        console.error("while Error in contact", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const getAllContact = async(req, res) => {
     const contact = await Contact.find({})
    res.status(200).json({
        success: true,
        data:contact,
        message: "All contact Fetched Successfully"
    })
}