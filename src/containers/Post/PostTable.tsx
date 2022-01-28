import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FormControl,
  Fab,
  Switch,
  Tooltip,
  Chip,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Divider,
  InputBase,
  Pagination,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AddBox, Clear, Edit, Search } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { IPostItem } from './types';

type props = {
  updatePostById: Function
  dataSource: IPostItem[]
  isFetching: boolean
}

function PostTable({ dataSource, updatePostById, isFetching }: props) {


  /** 
   *  using React.useMemo here to ensure that our data isn't recreated on every render.
   */
  // const rows: GridRowsProp = React.useMemo(() => ([
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  //   { id: 3, col1: 'MUI', col2: 'is Amazing' },
  // ]), [])

  // TODO: _id -> id from backend
  const rows: GridRowsProp = dataSource.map((post) => ({ ...post, id: post._id }))
  const columns: GridColDef[] = React.useMemo(() => ([
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'summary', headerName: 'Summary', width: 150 },
    { field: 'tags', headerName: 'Tags', width: 150 },
    { field: 'posterUrl', headerName: 'PosterUrl', width: 150 },
    { field: 'isPublic', headerName: 'isPublic', width: 90 },
    { field: 'like', headerName: 'Like', width: 60 },
    { field: 'pv', headerName: 'PV', width: 60 },
    { field: 'createdAt', headerName: 'CreatedAt', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modified Dated', width: 150 },
    { field: 'action', headerName: 'Action', width: 150 },
  ]), [])

  return (
    <>
      <Paper sx={{
        position: 'absolute',
        right: '24px',
        top: '83px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        zIndex: 1101,
      }}>
        <InputBase
          placeholder="Search Posts by Title"
          inputProps={{ 'aria-label': 'search post by title' }}
          onChange={() => { }} //TOOD
        />
        <IconButton
          color="primary"
          aria-label="clear"
          onClick={() => { }} //TOOD
        >
          <Search />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton
          color="primary"
          aria-label="clear"
          onClick={() => { }} //TOOD
        >
          <Clear />
        </IconButton>
      </Paper>

      <div style={{ height: '80%', width: '100%' }}>
        <DataGrid rows={rows} columns={columns}></DataGrid>
      </div>

      <button onClick={() => updatePostById({
        variables: { input: { isPublic: false, id: '143a8eef-0970-431b-973b-c1b493fbd366' } }
      })}>
        Test to upgrade post by id
      </button>
    </>
  )
}


export default PostTable;
