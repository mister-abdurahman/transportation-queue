import React, { useState } from "react";

const orderData = [
  {
    id: 1,
    customer_name: "bob",
    pick_up: "Ikeja, Lagos",
    drop_off: "Gbagada, Lagos",
  },
  {
    id: 2,
    customer_name: "Tayo",
    pick_up: "Ifako, Lagos",
    drop_off: "Iwo, Osun",
  },
  {
    id: 3,
    customer_name: "Idris",
    pick_up: "Nnembe, Bayelsa",
    drop_off: "Tanke, Kwara",
  },
];
interface slotType {
  no: number;
  orderId: null | number;
}
const slots: slotType[] = [
  { no: 1, orderId: null },
  { no: 2, orderId: null },
  { no: 3, orderId: null },
  { no: 4, orderId: null },
  { no: 5, orderId: null },
];

export default function Dashboard() {
  const [slot, setSlot] = useState(slots);

  function handleChange(e: React.FormEvent | any, orderId: number) {
    setSlot((prev: slotType[]) => {
      return prev.map((el) => {
        if (el.no == e.target.value) {
          el.orderId = orderId;
        }
        return el;
      });
    });
  }

  function findCustomer(el: slotType) {
    return orderData.find((order) => order.id == el.orderId);
  }

  function removeSlot(orderId: number | null) {
    setSlot((prev: slotType[]) => {
      return prev.map((el) => {
        if (el.orderId == orderId) {
          el.orderId = null;
        }
        return el;
      });
    });
  }

  function setTheDate(num: number) {
    const today = new Date();
    const nextWeekDate = new Date(today);
    nextWeekDate.setDate(today.getDate() + 7 + num);

    return Intl.DateTimeFormat("en-us", {
      dateStyle: "short",
    }).format(nextWeekDate);
  }

  return (
    <div className="min-h-[95.9vh] flex flex-col lg:flex-row lg:justify-between items-center lg:items-stretch gap-8 p-24 lg:text-base text-xs">
      <div className="lg:ml-0 ml-5">
        <table border={1}>
          <thead className="bg-green-400">
            <tr>
              <th className="px-6">S/N</th>
              <th className="px-6">Customer Name</th>
              <th className="px-6">Pick up</th>
              <th className="px-6">Drop off</th>
              <th className="px-6">Select Slot</th>
            </tr>
          </thead>

          {orderData.map((el, i) => (
            <tbody key={i} className="border-transparent border-t-8">
              <tr>
                <td className="px-6">{i + 1}</td>
                <td className="px-6 capitalize">{el.customer_name}</td>
                <td className="px-6">{el.pick_up}</td>
                <td className="px-6">{el.drop_off}</td>
                <td className="px-6">
                  <select
                    name=""
                    id=""
                    onChange={(e) => handleChange(e, el.id)}
                  >
                    <option value="">--Select Slot--</option>
                    {slot.map((el, i) => {
                      return !el.orderId ? (
                        <option key={i} value={el.no}>
                          Slot {i + 1}
                        </option>
                      ) : null;
                    })}
                  </select>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="flex lg:flex-col md:flex-row gap-4 justify-center flex-wrap">
        {slot.map((el, i) => (
          <div className="flex justify-between gap-2">
            {el.orderId ? (
              <div className="text-xs leading-none bg-green-200 p-1 text-black font-semibold rounded flex flex-col gap-1 items-center justify-center w-32">
                <p className="text-center">
                  {" "}
                  Pick up for{" "}
                  <span className="font-bold">
                    {findCustomer(el)?.customer_name}
                  </span>{" "}
                  at{" "}
                  <span className="font-bold">{findCustomer(el)?.pick_up}</span>{" "}
                  and drop off at{" "}
                  <span className="font-bold">
                    {findCustomer(el)?.drop_off}
                  </span>
                </p>
              </div>
            ) : (
              <div>&nbsp;</div>
            )}
            <div
              key={i}
              className={`${
                el.orderId ? "bg-red-600" : "bg-green-500"
              } cursor-pointer relative text-white font-semibold p-4 rounded flex flex-col gap-1 items-center w-32`}
            >
              {el.orderId && (
                <button
                  onClick={() => removeSlot(el.orderId)}
                  className="absolute top-2 right-2 bg-white hover:bg-red-100 transition-colors duration-500 text-red-600 rounded-full w-6 aspect-square"
                >
                  x
                </button>
              )}
              <p className="text-xs">{setTheDate(i)}</p>
              Slot {i + 1}
              {el.orderId && (
                <span className="text-xs leading-none">Taken</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
