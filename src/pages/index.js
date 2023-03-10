import Head from 'next/head'
import Image from 'next/image'
import { Poppins } from '@next/font/google'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Confetti from 'react-confetti'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {

  const [MRR, setMRR] = useState(0);
  const [convRate, setConvRate] = useState(0);
  const [clientLifeTime, setClientLifeTime] = useState(0);

  const [updatedMRR, setUpdatedMRR] = useState(MRR);
  const [updatedConvRate, setUpdatedConvRate] = useState(convRate);
  const [updatedClientLifeTime, setUpdatedClientLifeTime] = useState(clientLifeTime);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [calcPressed, setCalcPressed] = useState(true);
  const [numberOfPieces, setNumberofPieces] = useState(200)

  useEffect(() => {
    setWidth(window.innerWidth-20)
    setHeight(window.innerHeight)

    //after 5 seconds remove all confetti
    const timeId = setTimeout(() => {
      setCalcPressed(false)
    }, 5000)

    //after 3 seconds let it start disappearing
    const timeIdPieces = setTimeout(() => {
      setNumberofPieces(0)
    }, 3000)

    return () => {
      clearTimeout(timeIdPieces)
      clearTimeout(timeId)
    }


  }), []


  const firstText = `Average deal size (monthly recurring revenue) in AUD`;
  const secondText = `Average demo to close
  conversion rate`
  const thirdText = `Average client lifetime in months`

  const router = useRouter();


  return (
    <>
      <div className='upper test'>
        <Head>
          <title>Persifi ROI Calculator</title>
          <meta name="description" content="Persifi ROI Calculator" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <div className={poppins.className + ' top-bit'}>
          <div className='header'>
            <Image
              src={'/Persifi-logo.png'}
              width={180}
              height={61}
              alt={'Persifi Logo'}
            />
          </div>
          Fill in the information below to see how much revenue  {<br />}
          Persifi's outbound service will generate for your {<br />}

          business.
        </div>
        <div className='main-calc'>

          {calcLineTop(firstText)}
          {calcLineMiddle(secondText)}
          {calcLineBottom(thirdText)}

        </div>

        <div className='button-holder'>

          {calcButton()}

        </div>



      </div>

      <div className='lower test' id='result'>
        {(calcRoi() > 10) && calcPressed ? <Confetti width={width} height={height} numberOfPieces={numberOfPieces}></Confetti> : null}
        <div className={poppins.className + ' top-bit'}>
          <div className='header bottom-header'>
            <Image
              src={'/Persifi-logo.png'}
              width={180}
              height={61}
              alt={'Persifi Logo'}
            />
          </div>

        </div>

        {updatedMRR === 0 ? null : <div className='roi-container'>

          <div className={poppins.className + ' roi-section'}>
            {`${calcRoi().toLocaleString()} % ROI`}

          </div>
        </div>}




        <div className={poppins.className + ' mrr-and-ltv'}>
          {updatedMRR === 0 ? `Please fill out the calculator above to see how Persifi can accelerate your revenue growth` : 
          `Persifi will generate approximately $${calcMRR().toLocaleString()} MRR per month, a total of $${calcLTV().toLocaleString()} revenue based on the average customer's lifetime`}

        </div>

        {updatedMRR === 0 ? null : 
        <div className='disclaimer'>
          
        <p className={poppins.className + ' disclaimer-text'}>Based on 15 demos booked per month,<br /> and a monthly fee of AUD $5,000</p>
        <i className="bi bi-info-circle-fill disclaimer-icon"></i>

      </div>}
        

        <div className='contact-sales'>
          <Link href='https://www.persifi.com/contact-us/' scroll={false}>
            <button className='contact-sales-button'>Contact us</button>
          </Link>

        </div>




      </div>
    </>
  )

  function handleClick() {
    setUpdatedMRR(MRR);
    setUpdatedConvRate(convRate);
    setUpdatedClientLifeTime(clientLifeTime);
    setCalcPressed(true);
    setNumberofPieces(200);
  }

  function handleEnter(input, e) {
    setClientLifeTime(input);

    if (e.key === 'Enter') {
      handleClick();
      router.push('/#result', undefined, { scroll: false });
    }
  }

  function calcButton() {
    return (
      <Link href='#result' scroll={false}>
        <button className={poppins.className + ' calc-button'} onClick={handleClick}>
          Calculate
        </button>
      </Link>
    )
  }


  function calcLineTop(text) {
    return (
      <div className='container-top'>
        <div className='row'>
          <div className='col mt-3 col-8 calc-left-side'>
            <label className={poppins.className + ' value-heading'} htmlFor="deal-size">{text}</label>
          </div>
          <div className="input-group col calc-right-side">
            <div className="input-group-prepend">
              <span className="input-group-text rounded-left" id="deal-size">$</span>
            </div>
            <input type="text" className="form-control top" placeholder="" aria-label="Username" aria-describedby="deal-size"
              onInput={e => setMRR(e.target.value)} />
          </div>
        </div>
      </div>
    )
  }

  function calcLineMiddle(text) {
    return (
      <div className='container-middle'>
        <div className='row mb-3 mt-3'>
          <div className='col  col-8 calc-left-side'>
            <label className={poppins.className + ' value-heading'} htmlFor="conversion-rate">{text}</label>
          </div>
          <div className="input-group  col calc-right-side">
            <input type="text" className="form-control middle" placeholder="" aria-label="Username" aria-describedby="conversion-rate"
              onInput={e => setConvRate(e.target.value)} />

            <div className="input-group-append">
              <span className="input-group-text rounded-right" id="conversion-rate">%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function calcLineBottom(text) {
    return (
      <div className='container-bottom'>

        <div className='row  mb-3 mt-3'>
          <div className='col col-8 calc-left-side'>
            <label className={poppins.className + ' value-heading'} htmlFor="client-lifetime">{text}</label>
          </div>
          <div className="input-group col calc-right-side">
            <input type="text" className="form-control bottom" placeholder="" aria-label="Username" aria-describedby="client-lifetime"
              onKeyUp={e => handleEnter(e.target.value, e)} />

            <div className="input-group-append">
              <span className="input-group-text rounded-right" id="client-lifetime">months</span>
            </div>
          </div>
        </div>
      </div>

    )
  }

  function calcRoi() {

    let demosPerMonth = 15;
    let pipelineMonthly = demosPerMonth * updatedMRR;
    let expectedRev = pipelineMonthly * (updatedConvRate * 0.01);
    let roi = (expectedRev - 5000) / 5000;


    return roi * 100
  }


  function calcMRR() {
    let demosPerMonth = 15;
    let pipelineMonthly = demosPerMonth * updatedMRR;
    let expectedRev = pipelineMonthly * (updatedConvRate * 0.01);

    return expectedRev;
  }

  function calcLTV() {
    let demosPerMonth = 15;
    let pipelineMonthly = demosPerMonth * updatedMRR;
    let expectedRev = pipelineMonthly * (updatedConvRate * 0.01);
    let evOverCustomerLtv = updatedClientLifeTime * expectedRev;

    return evOverCustomerLtv;
  }
}
