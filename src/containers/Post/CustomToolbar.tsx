import { AddBox } from "@mui/icons-material"
import { Fab } from "@mui/material"
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid"

export function CustomToolbar(callback: Function) {

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Fab size="small" sx={{ boxShadow: 'none', background: 'none', color: 'rgba(0,0,0,0.54' }}>
        <AddBox onClick={() => callback()}/>
      </Fab>
    </GridToolbarContainer>
  )
}