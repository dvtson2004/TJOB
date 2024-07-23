import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./datatable.scss";

const DatatableTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('https://topjob-backend-5219ff13ed0d.herokuapp.com//transactions/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data = await response.json();
                setTransactions(transformData(data));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const transformData = (data) => {
        return data.map(item => ({
            id: item.transactionId,
            packageId: item.packageId,
            userId: item.userId,
            transactionDate: new Date(item.transactionDate[0], item.transactionDate[1] - 1, item.transactionDate[2]).toLocaleDateString(), // Construct and format date
            amount: item.amount.toFixed(2),
        }));
    };

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New Transaction
                <Link to="/transactions/add" className="link">
                    Add New
                </Link>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <DataGrid
                    className="datagrid"
                    rows={transactions}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 100 },
                        { field: 'userId', headerName: 'User Id', width: 200 },
                        { field: 'packageId', headerName: 'Package ID', width: 150 },
                        { field: 'transactionDate', headerName: 'Transaction Date', width: 200 },
                        { field: 'amount', headerName: 'Amount ($)', width: 150 },
                    ]}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            )}
        </div>
    );
};

export default DatatableTransaction;