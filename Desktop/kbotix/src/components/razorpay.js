import React,{useState} from 'react'

function Razorpay(props) {
    // const [paymentAmount, setPaymentAmount] = useState(1550)
    function paymentHandler(e) {
        e.preventDefault();
    
        const options = {
          key: "rzp_live_9rcnv8oETQ0qq9",
          amount: props.amount*100,
          name: 'Payments',
          description: 'Donate yourself some time',
    
          handler(response) {
            const paymentId = response.razorpay_payment_id;
            const url = "https://google.com";
            // Using my server endpoints to capture the payment
            console.log("payment id after payment", paymentId)
            fetch(url, {
              method: 'get',
              headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
              }
            })
            .then(resp =>  resp.json())
            .then(function (data) {
              console.log('Request succeeded with JSON response', data);

            })
            .catch(function (error) {
              console.log('Request failed', error);
            });
          },
    
          prefill: {
            name: 'Shashank Shekhar',
            email: 'ss@localtrip.in',
          },
          notes: {
            address: 'Goa,India',
          },
          theme: {
            color: '#9D50BB',
          },
        };
        const rzp1 = new window.Razorpay(options);
    
        rzp1.open();
      }
      return (
        <div className="wrapper">
          <div className="payments">
            <div className="payments-title">
            </div>
            <div className="payments-form">
              <form action="#" onSubmit={paymentHandler}>
                <p>
                  <label htmlFor="pay_amount" className="pay_amount">
                    Amount to be paid
                  </label>
                </p>
                <p>{props.amount} Rs</p>
                <p>
                  <button type="submit">Pay Now</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      );
}

export default Razorpay
