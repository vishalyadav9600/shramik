import React from 'react';
import Helperdetail from '../components/all_helper/Helperdetail';
import Foodlist from '../components/all_helper/Foodlist';
import Navbar from '../components/reusables/Navbar';

export default function Allfoods() {
  return (
    <div>
      <Helperdetail />
      <Foodlist />
    </div>
  );
}
