export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },

    {
        field: "avatarUrl",
        headerName: "Avatar",
        width: 110,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.avatarUrl} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "user_name",
        headerName: "User Name",
        width: 150,
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
    {
        field: "created_at",
        headerName: "Registration Date",
        width: 180,
    },
    {
        field: "role",
        headerName: "Occupation",
        width: 130,
    },
    {
        field: "is_active",
        headerName: "Status",
        width: 160,
    },
];