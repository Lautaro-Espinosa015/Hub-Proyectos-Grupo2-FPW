import React from 'react';

function OptionButton({ text, onClick }){
    return (
    <button className= "btn btn-primary w-100" onClick={onClick}>
      {text}
    </button>
  );

}

export default OptionButton;