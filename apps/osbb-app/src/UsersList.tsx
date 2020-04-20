import React, { useState, useEffect } from 'react';
import { User } from './User';
import { AgGridReact } from 'ag-grid-react';
import Grid from '@material-ui/core/Grid';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { SignupForm } from './SignupForm';

const columnDefs = [
  { headerName: "Телефон", field: "phone" },
  { headerName: "Email", field: "email" },
  { headerName: "Прізвище", field: "lastName" },
  { headerName: "Ім'я", field: "firstName" },
  { headerName: "По-батькові", field: "patName" },
  { headerName: "Status", field: "status" },
];

export function UsersList() {
    const [page, setPage] = useState(1);
    const [usersList, setUsersList] = useState<User[]>([]);
    const [selected, setSelected] = useState<User[]|null>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      fetch(
        `https://osbb-api.zelen.uk/users`,
        {
          method: "GET",
        }
      )
        .then(res => res.json())
        .then(list => {
          setUsersList(list);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
    }, [page]);

    return (
      <Grid container>
        <Grid item xs={selected && selected.length === 1 ? 7 : 12}>
          <div className="ag-theme-balham" style={ {height: '600px', width: '100%'} }>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={usersList}
                rowSelection='single'
                onSelectionChanged={({api}) => setSelected(api.getSelectedRows())}
              >
            </AgGridReact>
          </div>
        </Grid>
        { selected && selected.length === 1 &&
          <Grid item xs={5}>
            <SignupForm
              user={selected[0]}
              onSubmit={console.log}
              onCancel={() => setSelected(null)}
            />
          </Grid>
        }
      </Grid>
    )
}