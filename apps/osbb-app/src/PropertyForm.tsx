import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Property } from './SignupForm';
const PropertyForm = (properties: Property[], handleChange: ()=>void) => properties.map((property, k: number) => (<Grid container spacing={3} key={`property-${k}`}>
  <Grid item xs={12}>
    <FormControl>
      <InputLabel id="property-type-label">Type</InputLabel>
      <Select labelId="property-type-label" id="property-type" value={property.type} onChange={handleChange}>
        <MenuItem value={1}>Квартира</MenuItem>
        <MenuItem value={2}>Комора</MenuItem>
        <MenuItem value={3}>Паркомісце</MenuItem>
      </Select>
    </FormControl>
  </Grid>
</Grid>));
