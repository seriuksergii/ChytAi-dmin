import './RecentCustomers.scss';

const RecentCustomers = () => {
  return (
    <div className="container">
      <div className="recentCustomers">
        <div className="cardHeader">
          <h2>Recent Customers</h2>
        </div>
        <table>
          <tr>
            <td width="60px">
              <div className="imgBx">
                <img src="/src/assets/user.png" alt="Customer" />
              </div>
            </td>
            <td>
              <h4>
                Fedor <br /> <span>Kyiv</span>
              </h4>
            </td>
          </tr>
          <tr>
            <td width="60px">
              <div className="imgBx">
                <img src="/src/assets/user2.png" alt="Customer" />
              </div>
            </td>
            <td>
              <h4>
                Stepan <br /> <span>Kharkiv</span>
              </h4>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default RecentCustomers;
