"use client"
import Image from "next/image"
import React from "react"

import HeroImage from "../assets/Images/HeroImg.png"
import Aboutus1 from "../assets/Images/image1.png"
import Aboutus2 from "../assets/Images/image2.png"
import ChooseAMachineImage from "../assets/Images/choose-a-machine.png"
import EarnDailyRewards from "../assets/Images/earn-daily-rewards.png"
import LevelUpandRefer from "../assets/Images/level-up-and-refer.png"
import Link from "next/link"
import FaqImage from '../assets/Images/faq-image.png'
import AutomatedRewardsImg from '../assets/Images/automated-rewards.png'
import SmartLevelingSystemImg from '../assets/Images/smart-leveling-system.png'
import ReferralProgram from '../assets/Images/referral-program.png'
import SecureAndVerified from '../assets/Images/secure-and-verified.png'
import SmartAdminOversight from '../assets/Images/super-admin-oversight.png'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const faqData = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on all items with a full refund.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 100 countries around the world.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email.",
  },
  {
    question: "Can I change or cancel my order?",
    answer: "Orders can be modified within 24 hours after placement.",
  },
]

const LandingPage = () => {
  return (
    <div className='bg-[#0D0D0D] text-white font-sans'>
      {/* Header */}
      <header className='flex justify-between items-center p-4 border-b border-gray-800'>
        <input
          type='text'
          placeholder='Search'
          className='bg-gray-900 text-sm text-white px-4 py-2 rounded w-1/3'
        />
        <div className='flex items-center gap-4'>
          <Link href='/login'>
              <button className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer'>
                Login
              </button>
            </Link>
          <div className='relative'>
            <span className='absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5'>
              4
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.857 17.657A7.488 7.488 0 0112 18c-4.142 0-7.5-3.358-7.5-7.5S7.858 3 12 3s7.5 3.358 7.5 7.5a7.5 7.5 0 01-4.643 6.957l-.857 3.543z'
              />
            </svg>
          </div>
          <img
            src='https://randomuser.me/api/portraits/men/32.jpg'
            alt='Profile'
            className='w-8 h-8 rounded-full'
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className='flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-10'>
        <div className='max-w-xl'>
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
            Earn <span className='text-[#7B61FF]'>Rewards</span>. <br />
            Level Up. Unlock the <span className='text-[#7B61FF]'>Future</span>.
          </h1>
          <p className='mt-6 text-gray-300'>
            Invest in high-performing machines, grow daily rewards, and climb
            your way up through our transparent point-based leveling system.
          </p>
          <button className='mt-6 bg-[#7B61FF] hover:bg-[#674ddf] text-white px-6 py-2 rounded'>
            View Plans
          </button>
        </div>
        <Image src={HeroImage} alt='Hero' className='rounded-lg md:max-w-lg' />
      </section>

      {/* About Us Section */}
      <section className='bg-[#111111] px-8 md:px-16 py-12'>
        <h2 className='text-3xl font-semibold mb-6'>About Us</h2>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-1 text-gray-300'>
            <p className='mb-4'>
              Based in the vibrant and innovative landscape of the United
              Kingdom, CryptoTreasure was founded in 2023, with a simple yet
              powerful vision: to make crypto mining accessible, secure, and
              profitable for everyone.
            </p>
            <p className='mb-4'>
              Our journey began when a group of blockchain enthusiasts and
              financial experts came together to address the challenges of
              traditional crypto mining. We saw an opportunity to create a
              platform that combines cutting-edge technology with transparency
              and trust, all while adhering to the highest standards of UK
              regulations.
            </p>
            <p>
              Today, CryptoTreasure is proud to be a leading name in the crypto
              mining industry, helping users worldwide unlock their financial
              potential.
            </p>
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
            <Image
              src={Aboutus1}
              alt='Founder'
              className='rounded-lg w-[250px] h-[386px] object-cover'
            />
            <Image
              src={Aboutus2}
              alt='Co-founder'
              className='rounded-lg w-[250px] h-[386px] object-cover'
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='px-8 md:px-16 py-12'>
        <h2 className='text-3xl text-center font-semibold mb-10'>
          How It <span className='text-[#7B61FF]'>Works</span>
        </h2>
        <div className='flex flex-col md:flex-row gap-10 items-center'>
          <div className='bg-[#1A1A1A] p-6 rounded-xl w-full md:w-1/2 shadow-lg'>
            <label className='block text-gray-400 text-sm mb-2'>Email</label>
            <input
              type='email'
              className='w-full p-2 rounded bg-[#0D0D0D] text-white border border-gray-700 mb-4'
              defaultValue='ryan@insertframe.io'
              disabled
            />
            <label className='block text-gray-400 text-sm mb-2'>Password</label>
            <input
              type='password'
              className='w-full p-2 rounded bg-[#0D0D0D] text-white border border-gray-700 mb-4'
              defaultValue='•••••••••••••••'
              disabled
            />
            <button
              disabled
              className='w-full bg-[#7B61FF] hover:bg-[#674ddf] text-white py-2 rounded'
            >
              Login
            </button>
          </div>

          <div className='w-full md:w-1/2'>
            <p className='text-sm text-[#7B61FF] font-bold mb-2'>STEP 1</p>
            <h3 className='text-2xl font-semibold mb-2'>Sign Up</h3>
            <p className='text-gray-300 mb-4'>
              Create your account in seconds and verify your identity.
            </p>
            <Link href='/register'>
              <button className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer'>
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className='px-8 md:px-16 py-12'>
        <div className='flex flex-col md:flex-row-reverse gap-10 items-center'>
          <div className='bg-[#1A1A1A] rounded-xl w-full md:w-1/2 shadow-lg'>
            <Image src={ChooseAMachineImage} alt='choose a machine' />
          </div>

          <div className='w-full md:w-1/2'>
            <p className='text-sm text-[#7B61FF] font-bold mb-2'>STEP 2</p>
            <h3 className='text-2xl font-semibold mb-2'>Choose a Machine</h3>
            <p className='text-gray-300 mb-4'>
              Select a machine package based on your budget and ROI preference.
            </p>
            <Link href='/register'>
              <button className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer'>
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className='px-8 md:px-16 py-12'>
        <div className='flex flex-col md:flex-row gap-10 items-center'>
          <div className='bg-[#1A1A1A] rounded-xl w-full md:w-1/2 shadow-lg'>
            <Image src={EarnDailyRewards} alt='choose a machine' />
          </div>

          <div className='w-full md:w-1/2'>
            <p className='text-sm text-[#7B61FF] font-bold mb-2'>STEP 3</p>
            <h3 className='text-2xl font-semibold mb-2'>Earn Daily Rewards</h3>
            <p className='text-gray-300 mb-4'>
              Start earning rewards daily, automatically or manually
              distributed.
            </p>
            <Link href='/register'>
              <button className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer'>
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className='px-8 md:px-16 py-12'>
        <div className='flex flex-col md:flex-row-reverse gap-10 items-center'>
          <div className='bg-[#1A1A1A] rounded-xl w-full md:w-1/2 shadow-lg'>
            <Image src={LevelUpandRefer} alt='choose a machine' />
          </div>

          <div className='w-full md:w-1/2'>
            <p className='text-sm text-[#7B61FF] font-bold mb-2'>STEP 4</p>
            <h3 className='text-2xl font-semibold mb-2'>Level Up & Refer</h3>
            <p className='text-gray-300 mb-4'>
              Earn points with each action. Refer friends and get bonus
              commissions.
            </p>
            <Link href='/register'>
              <button className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer'>
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <h2 className='text-3xl text-center font-semibold mb-10'>
        Our <span className='text-[#7B61FF]'>Features</span>
      </h2>
      <section>
        <div className='flex flex-col items-center gap-6 px-4 py-10'>
          {/* Top Row (3 Cards) */}
          <div className='flex flex-wrap justify-center gap-6 max-w-6xl w-full'>
            <div className='bg-[#7367F0] p-6 rounded-xl w-full sm:w-[300px]'>
              <Image
                src={AutomatedRewardsImg}
                alt='Icon'
                className='h-18 w-18 mb-4 rounded-full bg-white object-contain'
              />
              <h2 className='text-xl text-white font-semibold mb-2'>
                Automated Rewards
              </h2>
              <p className='text-white'>
                Sit back while rewards are calculated and sent to your wallet.
              </p>
            </div>
            <div className='bg-[#1B1B1B] p-6 rounded-xl w-full sm:w-[300px]'>
              <Image
                src={SmartLevelingSystemImg}
                alt='Icon'
                className='h-18 w-18 bg-[#404040] mb-4 rounded-full object-contain'
              />
              <h2 className='text-xl text-white font-semibold mb-2'>
                Smart Leveling System
              </h2>
              <p className='text-white'>
                Earn points through activity and unlock higher levels for better perks.
              </p>
            </div>
            <div className='bg-[#1B1B1B] p-6 rounded-xl w-full sm:w-[300px]'>
              <Image
                src={ReferralProgram}
                alt='Icon'
                className='h-18 w-18 bg-[#404040] mb-4 rounded-full object-contain'
              />
              <h2 className='text-xl text-white font-semibold mb-2'>
                Referral Program
              </h2>
              <p className='text-white'>
                Invite others, earn commissions, and grow your network.
              </p>
            </div>
          </div>

          {/* Bottom Row (2 Cards) */}
          <div className='flex flex-wrap justify-center gap-6 max-w-4xl w-full'>
            <div className='bg-[#1B1B1B] p-6 rounded-xl w-full sm:w-[300px]'>
              <Image
                src={SecureAndVerified}
                alt='Icon'
                className='h-18 w-18 bg-[#404040] mb-4 rounded-full object-contain'
              />
              <h2 className='text-xl text-white font-semibold mb-2'>
                Secure & Verified
              </h2>
              <p className='text-white'>
                Fully protected data and manual control over wallet activity.
              </p>
            </div>
            <div className='bg-[#1B1B1B] p-6 rounded-xl w-full sm:w-[300px]'>
              <Image
                src={SmartAdminOversight}
                alt='Icon'
                className='h-18 w-18 bg-[#404040] mb-4 rounded-full object-contain'
              />
              <h2 className='text-xl text-white font-semibold mb-2'>
                Smart Admin Oversight
              </h2>
              <p className='text-white'>
                Our system is overseen by a powerful admin backend for accuracy and transparency.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='bg-[#0F0F0F] py-16 px-4 text-white'>
          <h2 className='text-center text-3xl sm:text-4xl font-semibold mb-12'>
            See what our <span className='text-[#7367F0]'>client’s</span> say
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className='bg-[#1C1C1C] p-6 rounded-xl shadow-md'>
                  <div className='text-[#7367F0] text-2xl mb-4'>“</div>
                  <p className='mb-6 leading-relaxed text-[#D1D1D1]'>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt labore dolore magna aliqua.
                    Quis ipsum suspendisse ultrices.
                  </p>
                  <div className='flex items-center gap-4'>
                    <img
                      src={`/images/client${(i % 3) + 1}.jpg`} // Replace with actual image paths
                      alt='Client'
                      className='w-12 h-12 rounded-full object-cover'
                    />
                    <div>
                      <h4 className='font-semibold text-white'>
                        Victoria Wotton
                      </h4>
                      <p className='text-[#7367F0] text-sm'>
                        Fementum Odio Co.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section>
        <div className='bg-[#0F0F0F] text-white py-16 px-6 lg:px-20'>
          <div className='flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto'>
            {/* Left: Image */}
            <div className='w-full lg:w-1/2'>
              <Image
                src={FaqImage}
                alt='FAQ Illustration'
                className='w-full max-w-md mx-auto rounded-xl'
              />
            </div>

            {/* Right: FAQ Accordion */}
            <div className='w-full lg:w-1/2'>
              <h2 className='text-3xl font-semibold mb-8 text-white'>
                Frequently Asked{" "}
                <span className='text-[#7367F0]'>Questions</span>
              </h2>

              {faqData.map((item, index) => (
                <Accordion
                  key={index}
                  sx={{
                    backgroundColor: "#1C1C1C",
                    color: "white",
                    boxShadow: "none",
                    mb: 2,
                    borderRadius: 2,
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#7367F0" }} />}
                  >
                    <Typography sx={{ fontWeight: 500 }}>
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: "#d1d1d1" }}>
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </section>
      <footer className='bg-[#1B1B1B] text-gray-400 px-6 py-10'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10'>
          {/* Left Section */}
          <div>
            {/* <h3 className="text-white font-semibold text-lg">Company</h3> */}
            <ul className='space-y-1 flex gap-4'>
              <li>
                <a href='#' className='hover:text-white'>
                  About
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  FAQs
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <div className='flex gap-4 text-xl'>
              <a href='#'>
                <FaFacebookF className='hover:text-white' />
              </a>
              <a href='#'>
                <FaTwitter className='hover:text-white' />
              </a>
              <a href='#'>
                <FaInstagram className='hover:text-white' />
              </a>
              <a href='#'>
                <FaLinkedinIn className='hover:text-white' />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-800 my-8'></div>

        {/* Bottom Row */}
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500'>
          <p>© {new Date().getFullYear()} Bluemines. All rights reserved.</p>
          <div className='flex flex-wrap gap-6 text-xs md:text-sm'>
            <span>Email: support@bluemines.com</span>
            <span>Phone: +1 123 456 7890</span>
            <span>Location: 123 Main St, City</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
