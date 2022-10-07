const Customer = require("../model/Customer");

module.exports = {
    getCustomers: (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset = page * limit;
        const sort = req.query.sort || "DESC";
        const order = req.query.order || "id";

        const query = {
            offset: offset,
            limit: Number(limit),
            order: [[sort, order]],
        };
        console.log(query);
        Customer.findAndCountAll(query)
            .then((result) => {
                const total = result.count;
                const pages = Math.ceil(total / limit);
                const customers = result.rows;
                res.status(200).json({
                    customers,
                    pages,
                    total,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                });
                console.log(err);
            });
    },
    getCustomer: (req, res) => {
        Customer.findOne({
            where: {
                id: req.params.id,
            },
        })
            .then((customer) => {
                res.status(200).json(customer);
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                });
            });
    },
    createCustomer: (req, res) => {
        Customer.create(req.body)
            .then((customer) => {
                res.status(201).json(customer);
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                });
            });
    },
    updateCustomer: (req, res) => {
        Customer.update(
            {
                name: req.body.name,
                phone: req.body.phone,
                birthDate: req.body.birthDate,
                address: req.body.address,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
            .then((customer) => {
                res.status(200).json(customer);
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                });
            });
    },
    deleteCustomer: (req, res) => {
        Customer.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then((customer) => {
                res.status(200).json(customer);
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                });
            });
    },
};
