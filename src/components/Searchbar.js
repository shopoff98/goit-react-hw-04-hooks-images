import React, { useState } from 'react';
import {
  Header,
  Input,
  Span,
  FormButton,
  Form,
} from './styled/Searchbar.styled';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import toast from 'react-hot-toast';


export default function Searchbar({ onSubmit })  {
  const [imageName, setImageName] = useState('');

  function handleSearch (e) {
    const { value } = e.currentTarget;
    setImageName(value.toLowerCase())
  };

  function handleSubmit (e)  {
    e.preventDefault();
    if (imageName === '') {
      return toast.error(`И что по-твоему мне вводить?`);
    }
    onSubmit(imageName);
    setImageName('')
  };

 
    return (
      <Header>
        <Form onSubmit={handleSubmit}>
          <FormButton type="submit">
            <Span>
              <SearchIcon />
            </Span>
          </FormButton>

          <Input
            name="imageName"
            type="text"
            value={imageName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleSearch}
          />
        </Form>
      </Header>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

