type Props = {
  children: JSX.Element;
};

const Card = ({ children }: Props) => (
  <div className='bg-navbar rounded-lg border border-gray-600 shadow-md'>
    <div className='flex flex-col items-center py-10'>{children}</div>
  </div>
);

export default Card;
