import { useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Input, Button } from "web3uikit";
import { abi, contractAddresses } from "../constants";

export default function EventContract() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const eventContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [transferEventId, setTransferEventId] = useState("");
  const [transferQuantity, setTransferQuantity] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [nameOfEvent, setNameOfEvent] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [ticketFee, setTicketFee] = useState("");
  const [buyEventId, setBuyEventId] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");

  const { runContractFunction: createEvent } = useWeb3Contract({
    abi: abi,
    contractAddress: eventContractAddress,
    functionName: "createEvent",
    params: {
      name: nameOfEvent,
      date: date,
      price: price,
      ticketCount: ticketCount,
    },
  });
  const { runContractFunction: buyTicket } = useWeb3Contract({
    abi: abi,
    contractAddress: eventContractAddress,
    functionName: "buyTicket",
    params: {
      id: buyEventId,
      quantity: buyQuantity,
    },
    msgValue: ticketFee,
  });
  const { runContractFunction: ticketTransfer } = useWeb3Contract({
    abi: abi,
    contractAddress: eventContractAddress,
    functionName: "ticketTransfer",
    params: {
      eventId: transferEventId,
      quantity: transferQuantity,
      to: transferAddress,
    },
  });

  return (
    <div>
      <div>
        <div className="flex justify-center space-x-5 pt-5 ">
          <Input
            label="Enter id of Event"
            name="name"
            onBlur={function noRefCheck() {}}
            value={buyEventId}
            onChange={({ target }) => setBuyEventId(target?.value)}
            type="text"
          />
          <Input
            label="Enter the quantity of ticket"
            name="name"
            onBlur={function noRefCheck() {}}
            value={buyQuantity}
            onChange={({ target }) => setBuyQuantity(target?.value)}
            type="text"
          />
          <Input
            label="Enter total ticket fee in wei"
            name="ticket fee"
            onBlur={function noRefCheck() {}}
            value={ticketFee}
            onChange={({ target }) => setTicketFee(target?.value)}
            type="number"
          />
        </div>
        <div className="flex justify-center pt-5">
          <Button
            color="red"
            onClick={async function () {
              await buyTicket();
            }}
            text="Buy Ticket"
            theme="colored"
          />
        </div>
      </div>
      <div className="flex justify-center space-x-40 pt-8">
        <div className="space-y-5">
          <div className="flex justify-center ">
            <Input
              label="Enter name of Event"
              name="name"
              onBlur={function noRefCheck() {}}
              value={nameOfEvent}
              onChange={({ target }) => setNameOfEvent(target?.value)}
              type="text"
            />
          </div>
          <div className="flex justify-center">
            <Input
              label="Enter date in UNIX"
              name="date"
              onBlur={function noRefCheck() {}}
              value={date}
              onChange={({ target }) => setDate(target?.value)}
              type="number"
            />
          </div>
          <div className="flex justify-center">
            <Input
              label="Enter price in WEI"
              name="price"
              onBlur={function noRefCheck() {}}
              value={price}
              onChange={({ target }) => setPrice(target?.value)}
              type="number"
            />
          </div>
          <div className="flex justify-center">
            <Input
              label="Enter number of ticket"
              name="ticket"
              onBlur={function noRefCheck() {}}
              value={ticketCount}
              onChange={({ target }) => setTicketCount(target?.value)}
              type="number"
            />
          </div>
          <div className="flex justify-center">
            <Button
              color="blue"
              onClick={async function () {
                await createEvent();
              }}
              text="Create Event"
              theme="colored"
            />
          </div>
        </div>
        <div className="space-y-5 pt-5">
          <div className="flex justify-center ">
            <Input
              label="Enter the event id"
              name="name"
              onBlur={function noRefCheck() {}}
              value={transferEventId}
              onChange={({ target }) => setTransferEventId(target?.value)}
              type="number"
            />
          </div>

          <div className="flex justify-center">
            <Input
              label="enter the quantity of ticket"
              name="price"
              onBlur={function noRefCheck() {}}
              value={transferQuantity}
              onChange={({ target }) => setTransferQuantity(target?.value)}
              type="number"
            />
          </div>
          <div className="flex justify-center">
            <Input
              label="Enter the address of receiver"
              name="ticket"
              onBlur={function noRefCheck() {}}
              value={transferAddress}
              onChange={({ target }) => setTransferAddress(target?.value)}
              type="text"
            />
          </div>
          <div className="flex justify-center">
            <Button
              color="blue"
              onClick={async function () {
                await ticketTransfer();
              }}
              text="Transfer Ticket "
              theme="colored"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
