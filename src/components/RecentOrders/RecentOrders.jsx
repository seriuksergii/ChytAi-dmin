import './RecentOrders.scss';
import ordersData from '../../assets/ordersData.json';

const RecentOrders = () => {
  return (
    <div className="recent-orders-container">
      <div className="recent-orders-card">
        <div className="card-header">
          <h2>Останні замовлення</h2>
          <a href="#" className="view-all-btn">
            Дивитися всі
          </a>
        </div>
        <table>
          <thead>
            <tr>
              <td>Назва</td>
              <td>Ціна</td>
              <td>Оплата</td>
              <td>Статус</td>
            </tr>
          </thead>
          <tbody>
            {ordersData.recentOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.price}</td>
                <td>{order.payment}</td>
                <td>
                  <span className={`status ${order.status}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
