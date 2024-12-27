export const Button = ({
  type,
  content,
  className,
  onClick,
}:{
  type: boolean,
  content: string,
  className?: string,
  onClick?: (() => {}),
}) => {
  return (
    <button
    className={`${className}`}
    onClick={onClick}>{content}</button>)
}