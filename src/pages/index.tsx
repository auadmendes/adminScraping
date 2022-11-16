import { useContext, useEffect, useState } from "react"
import { StopPaymentContext } from "../contexts/StopPaymentContext";

export default function Home() {
  const { merchantVip, stopPayment } = useContext(StopPaymentContext)
  const [selectedCustomers, setSelectedCustomer] = useState([])

  let filterCustomer = []
  let filterCustomer2 = {}

  function selectCustomer() {
    // console.log(filterCustomer)
    // console.log(Object.keys(filterCustomer))

    // for (let [key, value] of Object.entries(filterCustomer)) {
    //   console.log(key => filterCustomer[key])
    // }

    // console.log('Filter')
    // console.log(filterCustomer)
    // Object.keys(filterCustomer).forEach(function (item) {
    //   console.log(item)
    // })

    const formattedCustomers = stopPayment.reduce((total, customer) => {
      const customers = { ...total }

      if (!customers[customer.customerName]) {
        customers[customer.customerName] = []
      }
      customers[customer.customerName].push([
        // merchantName: customer.merchantName,
        // amount: customer.amount,
        // reasonCode: customer.reasonCode

        (customer.merchantName),
        (customer.amount),
        (customer.reasonCode),
        (customer.pasClerkPtx),
        (customer.refID),
        (customer.merchantReference),
        (customer.transactionId),
        (customer.signatureRef),

      ], [])

      //console.log(customers)

      return customers
    }, [])


    const newCustomers = Object.keys(formattedCustomers).map(customer => {
      return {
        name: customer,
        cases: formattedCustomers[customer],
        total: formattedCustomers[customer].reduce((total, currentAmount) => {
          return total + currentAmount[1]
        }, 0)
      }
    })


    filterCustomer.push(formattedCustomers)
    console.log(newCustomers)

    filterCustomer.map(item => {
      console.log(item)
    })
    // console.log(Object.keys(formattedCustomers))
  }
  return (
    <div className="flex flex-1 items-center justify-center w-screen ">
      <div className="flex-1 pt-8 pl-8 pr-8 flex flex-col w-full overflow-auto">
        <div>
          <button onClick={selectCustomer} className="h-12 p-4 bg-Trutly mb-4">
            Filter
          </button>
        </div>


        <div>

          <div className="bg-red-100 w-full h-[300px]">
            {filterCustomer.map(item => {
              return (
                <h1 className="tex-[30px]">{item}</h1>
              )
            })}
          </div>

          <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                View all
              </a>
            </div>
            <div className="flow-root">

              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"> */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Neil Sims
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $320
                    </div>
                  </div>
                </li>
                {/* <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image">
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Bonnie Green
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $3467
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Michael image">
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Michael Gough
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $67
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Lana image">
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Lana Byrd
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $367
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Thomas image">
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $2367
                    </div>
                  </div>
                </li> */}
              </ul>

            </div>
          </div>

        </div>


        {stopPayment.length > 0 ? (
          <table className="w-full max-w-full border-collapse min-w-[500px] border-2">
            <thead>
              <tr>
                <th className="bg-gray-700 text-gray-100 p-4 text-left text-sm 
              font-bold leading-6 rounded-tl-lg pl-6">
                  Customer
                </th>
                <th className="bg-gray-700 text-gray-100 p4 text-left text-sm 
              font-bold leading-6" >
                  Merchant
                </th>
                <th className="bg-gray-700 text-gray-100 p4 text-left text-sm 
              font-bold leading-6" >
                  Amount
                </th>
                <th className="bg-gray-700 text-gray-100 p4 text-left text-sm 
              font-bold leading-6" >
                  Type
                </th>
                <th className="bg-gray-700 text-gray-100 p4 text-left text-sm 
              font-bold leading-6" >
                  PTX
                </th>
                <th className="bg-gray-700 text-gray-100 p4 text-left text-sm font-bold
              leading-6 rounded-tr-lg pr-6" >
                  REF ID
                </th>
                <th className="bg-gray-700 text-gray-100 p4 text-left text-sm font-bold
              leading-6 rounded-tr-lg pr-6" >
                  Merchant REF
                </th>
                <th className="bg-gray-700 text-gray-100 p4 text-left text-sm font-bold
              leading-6 rounded-tr-lg pr-6" >
                  Transaction
                </th>
                <th className="bg-gray-700 text-gray-100 p4 text-left text-sm font-bold
              leading-6 rounded-tr-lg pr-6" >
                  Signature
                </th>
                <th className="bg-gray-700 text-gray-100 p4 text-left text-sm font-bold
              leading-6 rounded-tr-lg pr-6" >
                  Amount
                </th>

              </tr>
            </thead>
            <tbody>
              {stopPayment.map((item) => {
                return (
                  <tr className="w-screen text-left gap-2">
                    <td
                      className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 p-2 w-auto"
                    >
                      {item.customerName}
                    </td>
                    <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 w-1/10">{item.merchantName}</td>
                    <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 pl-4 pr-4">{item.amount}</td>
                    <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 pr-4">{item.reasonCode}</td>
                    <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm leading-4 p-2  pr-4">{item.pasClerkPtx}</td>
                    <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 w-auto">{item.log}</td>
                    <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm leading-4">{item.merchantReference}</td>
                    <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 w-auto">{item.transactionId}</td>
                    <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm  w-auto">{item.signatureRef}</td>
                    <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 w-auto">USD {item.amount}</td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        ) : (
          <div>
            <span>empty</span>
          </div>
        )}
        <table className="w-full max-w-full border-collapse min-w-[500px] border-2">
          <thead>
            <tr>
              <th className="bg-gray-700 text-gray-100 p-4 text-left text-sm 
              font-bold leading-6 rounded-tl-lg pl-6">
                Transaction
              </th>
              <th className="bg-gray-700 text-gray-100 p4 text-left text-sm 
              font-bold leading-6" >
                Merchant
              </th>
              <th className="bg-gray-700 text-gray-100 p4 text-left text-sm 
              font-bold leading-6" >
                Amount
              </th>
              <th className="bg-gray-700 text-gray-100 p4 text-left text-sm 
              font-bold leading-6" >
                Type
              </th>
              <th className="bg-gray-700 text-gray-100 p4 text-left text-sm 
              font-bold leading-6" >
                Code
              </th>
              <th className="bg-gray-700 text-gray-100 p4 text-left text-sm font-bold
              leading-6 rounded-tr-lg pr-6" >
                Log
              </th>
            </tr>
          </thead>
          <tbody>
            {merchantVip.map((item) => {
              return (
                <tr>
                  <td
                    className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 p-2 w-[200px]"
                  >
                    {item.transactionId}
                  </td>
                  <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 w-1/2">{item.merchantName}</td>
                  <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4">{item.amount}</td>
                  <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4">{item.reason}</td>
                  <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4">{item.reasonCode}</td>
                  <td className="bg-gray-500 border-t-2 border-solid border-gray-[#e1e1e6] 
                  text-gray-100 text-sm font-bold leading-4 w-auto">{item.log}</td>
                </tr>
              )
            })}

          </tbody>
        </table>

      </div>
    </div >
  )
}