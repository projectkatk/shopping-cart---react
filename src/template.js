class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [
        {
          name: "Feetbook",
          shares_owned: 20,
          cost_per_share: 50,
          market_price: 130,
        },
        {
          name: "Yamazon",
          shares_owned: 5,
          cost_per_share: 200,
          market_price: 500,
        },
        {
          name: "Snoozechat",
          shares_owned: 100,
          cost_per_share: 20,
          market_price: 3,
        }
      ],
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    };
    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addStock = this.addStock.bind(this);
  }
  //changes the value of the input inside the table
  handleChange(e, index) {
    const portfolio = this.state.portfolio.slice();
    const { name, value } = e.target;
    portfolio[index][name] = value;
    this.setState({ portfolio });
  }
  // removes the entire row on 'remove' button click
  removeStock(index) {
    const portfolio = this.state.portfolio.slice();
    portfolio.splice(index, 1);
    this.setState({ portfolio });
  }  
 // handles the 'add an item' button click to add the new stock onto the list
  handleFormChange(e) {
    const { name, value } = e.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  }
  // gets triggered once 'add an item' button gets clicked
  addStock(e) {
    e.preventDefault();
    const portfolio = this.state.portfolio.slice();
    portfolio.push(this.state.form);

    this.setState({
      portfolio,
      form: {
        name: "",
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    });
  }

  render() {
    const { portfolio, form } = this.state;
    const portfolio_market_value = portfolio.reduce(
      (sum, stock) => stock.shares_owned * stock.market_price + sum,
      0
    );
    const portfolio_cost = portfolio.reduce(
      (sum, stock) => stock.shares_owned * stock.cost_per_share + sum,
      0
    );
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;
    
    // style changes depending on the value of the portfolio
    const style = {
        color: portfolio_gain_loss > 0 ? "black" : "red"
    };

    return (
      <div className="container text-center w-100">
        <h1 className="text-center my-4 fw-bold text-primary">Stock Portfolio</h1>
        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table-sm mx-auto">
              <thead>
                <tr className="border-bottom">
                  <th scope="col">Name</th>
                  <th scope="col">Volume</th>
                  <th scope="col">Cost/Share ($)</th>
                  <th scope="col">Market Price ($)</th>
                  <th scope="col">Market Value ($)</th>
                  <th scope="col">Unrealized Gain/Loss ($)</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="col-12 md-col-6">
                {/* loops the entire portfolio array and reflects every single element in each tr*/}
                {portfolio.map((item, index) => {
                  const { name, shares_owned, cost_per_share, market_price } =
                    item;       
                  const market_value = shares_owned * market_price;
                  const unrealized_gain_loss =
                    market_value - shares_owned * cost_per_share;
                    
                    const style = {
                        color: unrealized_gain_loss > 0 ? "black" : "red"
                    };


                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>
                        <input
                          type="number"
                          name="shares_owned"
                          value={shares_owned < 0 ? 0 : shares_owned}
                          onChange={(e) => this.handleChange(e, index)}
                          className="mr-4 w-75"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="cost_per_share"
                          value={cost_per_share < 0 ? 0 : cost_per_share}
                          onChange={(e) => this.handleChange(e, index)}
                          className="mr-4 w-75"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="market_price"
                          value={market_price < 0 ? 0 : market_price}
                          onChange={(e) => this.handleChange(e, index)}
                          className="mr-4 w-75"
                        />
                      </td>
                      <td>{market_value.toFixed(2)}</td>
                      <td style={style}>{unrealized_gain_loss.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm text-white remove"
                          onClick={() => this.removeStock(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* form to add a new stock to the portfolio list */}
          <form className="col-12 mt-2 mb-4 border-top" onSubmit={this.addStock}>
            <label className="d-block">Name of Stock: 
                <input
                className="my-2 w-50 mx-5"
                name="name"
                type="text"
                placeholder="Name"
                onChange={this.handleFormChange}
                value={form.name}
                required
                />
            </label>
            <label className="d-block">
                No. Shares owned:           
                <input
                className="my-2 w-25 mx-5"
                name="shares_owned"
                type="number"
                placeholder="Volume of share"
                value={form.shares_owned < 0 ? 0 : form.shares_owned} //no negative figures are allowed
                onChange={this.handleFormChange}
                />
             </label>
            <label className="d-block">
                No. Purchase Price:           
                <input
                className="my-2 w-25 mx-5"
                name="cost_per_share"
                type="number"
                placeholder="Cost"
                value={form.cost_per_share < 0 ? 0 : form.cost_per_share} //no negative figures are allowed
                onChange={this.handleFormChange}
                />
             </label>
            <label className="d-block">
                Market Value:
                <input
                className="my-2 w-50 mx-5"
                name="market_price"
                type="number"
                placeholder="Price"
                value={form.market_price < 0 ? 0 : form.market_price}  //no negative figures are allowed
                onChange={this.handleFormChange}
                />
            </label>
            
            <button className="btn btn-primary col-6 col-md-2 mx-2 my-2 d-block mx-auto text-center">Add an item</button>
          </form>
          {/* Showing the portfolio values */}
          <div className="col-12 col-md-6">
            <h4 className="my-3 fw-bold fs-5 p-2">Portfolio Value: ${portfolio_market_value.toFixed(2)}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="my-3 fw-bold bg-white p-2 fs-5 rounded" >
              Portfolio gain/loss: 
              <span style={style}>
                {/* if the portfolio total value is positive, 'profit' after the number appears, and 'loss' appears when the value is negative */}
                ${portfolio_gain_loss.toFixed(2) > 0 ? portfolio_gain_loss.toFixed(2) + " profit" : -portfolio_gain_loss.toFixed(2) + " loss" } 
                
              </span> 
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Portfolio />, document.getElementById("root"));




