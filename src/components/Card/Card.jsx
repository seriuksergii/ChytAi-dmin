import './Card.scss';
import { FaEye, FaShoppingCart, FaComment, FaDollarSign } from 'react-icons/fa';

const Card = () => {
  return (
    <div className="cardBox">
      <div className="card">
        <div>
          <div className="numbers">1,504</div>
          <div className="cardName">Daily Views</div>
        </div>
        <div className="iconBx">
          <FaEye size={56} color="gray" />
        </div>
      </div>

      <div className="card">
        <div>
          <div className="numbers">80</div>
          <div className="cardName">Sales</div>
        </div>
        <div className="iconBx">
          <FaShoppingCart size={56} color="gray" />
        </div>
      </div>

      <div className="card">
        <div>
          <div className="numbers">284</div>
          <div className="cardName">Comments</div>
        </div>
        <div className="iconBx">
          <FaComment size={56} color="gray" />
        </div>
      </div>

      <div className="card">
        <div>
          <div className="numbers">$7,842</div>
          <div className="cardName">Earning</div>
        </div>
        <div className="iconBx">
          <FaDollarSign size={56} color="gray" />
        </div>
      </div>
    </div>
  );
};

export default Card;
