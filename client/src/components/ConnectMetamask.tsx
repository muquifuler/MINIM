import Metamask from '../assets/metamask.png'
import WalletPng from '../assets/cryptocurrency-wallet.png'

import '../styles/ConnectMetamask.css'

export default function ConnectMetamask({ myAddress, requestAccount, setConnectWallet }: { myAddress: string, requestAccount: Function, setConnectWallet: Function }) {
    return (
      <div className='ConnectMetamask'>
        <div className='izqCW'>
            <p style={{ fontWeight: '600', fontSize: '2vh'}}>Connect Wallet</p>
            <p>Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.</p>
            <button onClick={(e) => {
                e.stopPropagation();
                requestAccount();
                setConnectWallet(false)
            }}>
                <img src={Metamask} alt="" />
                <p>Metamask</p>
            </button>
        </div>
        <div className='derCW'>
            <p>What´s a Web3 Wallet?</p>
            <img src={WalletPng} alt="" />
            <button>
                <span>Learn How to Connect</span>
                <svg viewBox="0 -2 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSketch="http://www.bohemiancoding.com/sketch/ns" fill="#f4f4f4"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow-right</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketchType="MSPage"> <g id="Icon-Set" sketchType="MSLayerGroup" transform="translate(-360.000000, -933.000000)" fill="#f4f4f4"> <path d="M388,933 L368,933 C365.791,933 364,934.791 364,937 L364,941 L366,941 L366,937 C366,935.896 366.896,935 368,935 L388,935 C389.104,935 390,935.896 390,937 L390,957 C390,958.104 389.104,959 388,959 L368,959 C366.896,959 366,958.104 366,957 L366,953 L364,953 L364,957 C364,959.209 365.791,961 368,961 L388,961 C390.209,961 392,959.209 392,957 L392,937 C392,934.791 390.209,933 388,933 L388,933 Z M377.343,953.243 C376.953,953.633 376.953,954.267 377.343,954.657 C377.733,955.048 378.367,955.048 378.758,954.657 L385.657,947.758 C385.865,947.549 385.954,947.272 385.94,947 C385.954,946.728 385.865,946.451 385.657,946.243 L378.758,939.344 C378.367,938.953 377.733,938.953 377.343,939.344 C376.953,939.733 376.953,940.367 377.343,940.758 L382.586,946 L361,946 C360.447,946 360,946.448 360,947 C360,947.553 360.447,948 361,948 L382.586,948 L377.343,953.243 L377.343,953.243 Z" id="arrow-right" sketchType="MSShapeGroup"> </path> </g> </g> </g></svg>
            </button>
        </div>
      </div>
    )
  }
  