<script setup>
import { ref } from 'vue';
import PriceCard from '@/components/PriceCard.vue';
</script>
<template>
  <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
    <h1 class="display-4 fw-normal text-body-emphasis">Pricing</h1>
    <p class="fs-5 text-body-secondary">
      Quickly build an effective pricing table for your potential
      customers with this Bootstrap example. It’s built with default
      Bootstrap components and utilities with little customization.
    </p>
  </div>
  <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
    <div class="col">
      <PriceCard title="Free Plan" btnClass="btn-success" :id="1">
        <ul class="list-unstyled mt-3 mb-4">
          <li>10 users included</li>
          <li>2 GB of storage</li>
          <li>Email support</li>
          <li>Help center access</li>
        </ul>
      </PriceCard>
    </div>
    <div class="col">
      <PriceCard title="Standard Plan" price="10" :disabled="true" :id="2" />
    </div>
    <div class="col">
      <PriceCard title="Pro Plan" price="10" :disabled="false" :id="3">
      <ul class="list-unstyled mt-3 mb-4">
        <li>20 users included</li>
        <li>10 GB of storage</li>
        <li>Priority email support</li>
        <li>Help center access</li>
      </ul>
      </PriceCard>
    </div>
  </div>
</template>