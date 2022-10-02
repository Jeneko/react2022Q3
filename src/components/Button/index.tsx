import React from 'react';
import './Button.css';

export enum ButtonType {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary',
  transparent = 'transparent',
}

export enum ButtonIcon {
  like = 'like',
  fav = 'fav',
}

interface ButtonProps {
  text?: string;
  type?: ButtonType;
  icon?: ButtonIcon;
  counter?: number;
  selected?: boolean;
  onClick?: () => void;
  title?: string;
}

function Button(props: ButtonProps) {
  let btnClass = 'btn';

  if (props.type) {
    btnClass += ` btn--${props.type}`;
  }

  if (props.selected) {
    btnClass += ' btn--selected';
  }

  return (
    <button onClick={props.onClick} className={btnClass} title={props.title}>
      {props.icon && <span className={`btn__${props.icon}-icon`}></span>}
      {props.text && <span className="btn__text">{props.text}</span>}
      {props.counter !== undefined && <span className="btn__value">{props.counter}</span>}
    </button>
  );
}

export { Button };
