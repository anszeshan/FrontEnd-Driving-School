make sure to make one single page with all the information of registration page which user sets show into it as in registration page and usr can update in it, i dont want separate page for procng and services and pofile etc, make one page for all this and make sure its exactly the same field which is in registaration form so that process remain smooth and no change occur in model etc. Do it fastly  "use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Minus, HelpCircle, CheckCircle } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SchoolDashboardLayout from "@/components/school-dashboard-layout";

export default function SchoolPricingPage() {
  const [pricing, setPricing] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
// const [loggedInEmail, setLoggedInEmail] = useState('default@example.com');
  // Simulated logged-in email (replace with actual auth mechanism)
  // const loggedInEmail = localStorage.getItem('schoolEmail') || "default@example.com";

  const [loggedInEmail, setLoggedInEmail] = useState(() => localStorage.getItem('schoolEmail') || 'default@example.com');

useEffect(() => {
  const fetchPricing = async () => {
    try {
      const response = await axios.get("https://backend-ds-blue.vercel.app/api/school/pricing", {
        params: { email: loggedInEmail },
      });
      setPricing(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load pricing data");
      setLoading(false);
    }
  };
  fetchPricing();
}, [loggedInEmail]);
  // useEffect(() => {
  //   const email = localStorage.getItem('schoolEmail') || 'default@example.com';
  //   setLoggedInEmail(email);
  //   const fetchPricing = async () => {
  //     try {
  //       const response = await axios.get("https://backend-ds-blue.vercel.app/api/school/pricing", {
  //         params: { email: loggedInEmail },
  //       });
  //       setPricing(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to load pricing data");
  //       setLoading(false);
  //     }
  //   };
  //   fetchPricing();
  // }, []);

  const handleBasicPriceChange = (key, value) => {
    setPricing({
      ...pricing,
      basic: {
        ...pricing.basic,
        [key]: Number.parseFloat(value) || 0,
      },
    });
  };

  const handlePackageChange = (packageKey, field, value) => {
    setPricing({
      ...pricing,
      packages: {
        ...pricing.packages,
        [packageKey]: {
          ...pricing.packages[packageKey],
          [field]:
            field === "enabled"
              ? value
              : field === "name" || field === "description"
                ? value
                : Number.parseFloat(value) || 0,
        },
      },
    });
  };

  const handleDiscountChange = (discountKey, field, value) => {
    setPricing({
      ...pricing,
      discounts: {
        ...pricing.discounts,
        [discountKey]: {
          ...pricing.discounts[discountKey],
          [field]: field === "enabled" ? value : Number.parseFloat(value) || 0,
        },
      },
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      const payload = { email: loggedInEmail, ...pricing };
      await axios.put("https://backend-ds-blue.vercel.app/api/school/pricing", payload);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save pricing");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!pricing) return <div className="text-center py-10 text-red-500">{error || "Pricing data not found"}</div>;

  return (
    <SchoolDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pricing Management</h1>
        <Button onClick={handleSave} disabled={isSaving} className="bg-rose-500 hover:bg-rose-600">
          {isSaving ? "Saving..." : "Save Changes"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {saveSuccess && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your pricing changes have been saved successfully.</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-red-50 text-red-600 border-red-200">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Tabs defaultValue="individual">
        <TabsList className="mb-6">
          <TabsTrigger value="individual">Individual Pricing</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Pricing</CardTitle>
              <CardDescription>Set the prices for individual services and lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="registrationFee">Registration Fee (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("registrationFee", pricing.basic.registrationFee - 5)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="registrationFee"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.registrationFee}
                      onChange={(e) => handleBasicPriceChange("registrationFee", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("registrationFee", pricing.basic.registrationFee + 5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theoryLesson">Theory Lesson (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("theoryLesson", pricing.basic.theoryLesson - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="theoryLesson"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.theoryLesson}
                      onChange={(e) => handleBasicPriceChange("theoryLesson", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("theoryLesson", pricing.basic.theoryLesson + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drivingLesson">Driving Lesson (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("drivingLesson", pricing.basic.drivingLesson - 5)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="drivingLesson"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.drivingLesson}
                      onChange={(e) => handleBasicPriceChange("drivingLesson", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("drivingLesson", pricing.basic.drivingLesson + 5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nightDriving">Night Driving Lesson (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("nightDriving", pricing.basic.nightDriving - 5)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="nightDriving"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.nightDriving}
                      onChange={(e) => handleBasicPriceChange("nightDriving", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("nightDriving", pricing.basic.nightDriving + 5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highwayDriving">Highway Driving Lesson (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("highwayDriving", pricing.basic.highwayDriving - 5)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="highwayDriving"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.highwayDriving}
                      onChange={(e) => handleBasicPriceChange("highwayDriving", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("highwayDriving", pricing.basic.highwayDriving + 5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examFee">Practical Exam Fee (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("examFee", pricing.basic.examFee - 10)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="examFee"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.examFee}
                      onChange={(e) => handleBasicPriceChange("examFee", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("examFee", pricing.basic.examFee + 10)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theoryExam">Theory Exam Fee (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("theoryExam", pricing.basic.theoryExam - 10)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="theoryExam"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.theoryExam}
                      onChange={(e) => handleBasicPriceChange("theoryExam", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("theoryExam", pricing.basic.theoryExam + 10)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Calculator Preview</CardTitle>
              <CardDescription>See how your pricing will appear in the price calculator</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-4">Sample Calculation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Registration Fee</span>
                    <span>€{pricing.basic.registrationFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theory Lessons (14x)</span>
                    <span>€{(pricing.basic.theoryLesson * 14).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Driving Lessons (20x)</span>
                    <span>€{(pricing.basic.drivingLesson * 20).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Night Driving (3x)</span>
                    <span>€{(pricing.basic.nightDriving * 3).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highway Driving (3x)</span>
                    <span>€{(pricing.basic.highwayDriving * 3).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theory Exam Fee</span>
                    <span>€{pricing.basic.theoryExam.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Practical Exam Fee</span>
                    <span>€{pricing.basic.examFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      €
                      {(
                        pricing.basic.registrationFee +
                        pricing.basic.theoryLesson * 14 +
                        pricing.basic.drivingLesson * 20 +
                        pricing.basic.nightDriving * 3 +
                        pricing.basic.highwayDriving * 3 +
                        pricing.basic.theoryExam +
                        pricing.basic.examFee
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Package Pricing</CardTitle>
              <CardDescription>Create and manage package deals for your driving school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(pricing.packages).map(([key, packageData]) => (
                <div key={key} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">{packageData.name}</h3>
                    <div className="flex items-center">
                      <Label htmlFor={`${key}-enabled`} className="mr-2">
                        Active
                      </Label>
                      <Switch
                        id={`${key}-enabled`}
                        checked={packageData.enabled}
                        onCheckedChange={(checked) => handlePackageChange(key, "enabled", checked)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-name`}>Package Name</Label>
                      <Input
                        id={`${key}-name`}
                        value={packageData.name}
                        onChange={(e) => handlePackageChange(key, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-price`}>Package Price (€)</Label>
                      <Input
                        id={`${key}-price`}
                        type="number"
                        value={packageData.price}
                        onChange={(e) => handlePackageChange(key, "price", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor={`${key}-description`}>Description</Label>
                    <Input
                      id={`${key}-description`}
                      value={packageData.description}
                      onChange={(e) => handlePackageChange(key, "description", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-lessons`}>Driving Lessons</Label>
                      <Input
                        id={`${key}-lessons`}
                        type="number"
                        value={packageData.lessons}
                        onChange={(e) => handlePackageChange(key, "lessons", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-theory`}>Theory Lessons</Label>
                      <Input
                        id={`${key}-theory`}
                        type="number"
                        value={packageData.theoryLessons}
                        onChange={(e) => handlePackageChange(key, "theoryLessons", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4 bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">Individual price: </span>
                        <span>
                          €
                          {(
                            pricing.basic.registrationFee +
                            pricing.basic.theoryLesson * packageData.theoryLessons +
                            pricing.basic.drivingLesson * packageData.lessons +
                            pricing.basic.nightDriving * 3 +
                            pricing.basic.highwayDriving * 3 +
                            pricing.basic.theoryExam +
                            pricing.basic.examFee
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Package savings: </span>
                        <span className="text-green-600">
                          €
                          {(
                            pricing.basic.registrationFee +
                            pricing.basic.theoryLesson * packageData.theoryLessons +
                            pricing.basic.drivingLesson * packageData.lessons +
                            pricing.basic.nightDriving * 3 +
                            pricing.basic.highwayDriving * 3 +
                            pricing.basic.theoryExam +
                            pricing.basic.examFee -
                            packageData.price
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center">
                <Button variant="outline" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Discounts</CardTitle>
              <CardDescription>Set up discounts for special groups or promotions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(pricing.discounts).map(([key, discount]) => (
                  <div key={key} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <Switch
                        id={`${key}-enabled`}
                        checked={discount.enabled}
                        onCheckedChange={(checked) => handleDiscountChange(key, "enabled", checked)}
                        className="mr-4"
                      />
                      <div>
                        <Label htmlFor={`${key}-enabled`} className="font-medium">
                          {key === "studentDiscount"
                            ? "Student Discount"
                            : key === "groupDiscount"
                              ? "Group Discount (2+ people)"
                              : "Seasonal Discount"}
                        </Label>
                        {key === "studentDiscount" && (
                          <p className="text-sm text-muted-foreground">Discount for students with valid ID</p>
                        )}
                        {key === "groupDiscount" && (
                          <p className="text-sm text-muted-foreground">
                            Discount when 2 or more people register together
                          </p>
                        )}
                        {key === "seasonalDiscount" && (
                          <p className="text-sm text-muted-foreground">
                            Special promotional discount for seasonal campaigns
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Input
                        id={`${key}-percentage`}
                        type="number"
                        value={discount.percentage}
                        onChange={(e) => handleDiscountChange(key, "percentage", e.target.value)}
                        className="w-20 text-center mr-2"
                      />
                      <span>%</span>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Discount
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Discount Settings
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">Configure how discounts are applied and displayed to customers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stackable" className="font-medium">
                      Allow stackable discounts
                    </Label>
                    <p className="text-sm text-muted-foreground">Allow customers to use multiple discounts at once</p>
                  </div>
                  <Switch id="stackable" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="display-savings" className="font-medium">
                      Display savings on website
                    </Label>
                    <p className="text-sm text-muted-foreground">Show potential savings to customers on your profile</p>
                  </div>
                  <Switch id="display-savings" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-apply" className="font-medium">
                      Automatically apply best discount
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      System will apply the best discount for the customer
                    </p>
                  </div>
                  <Switch id="auto-apply" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SchoolDashboardLayout>
  );
}const School = require('../models/School');

// Get school pricing
exports.getSchoolPricing = async (req, res) => {
  try {
    const { email } = req.query;
    console.log('Get pricing for email:', email);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const school = await School.findOne({ email });
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    return res.status(200).json(school.pricing || {
      basic: {
        registrationFee: 100,
        theoryLesson: 20,
        drivingLesson: 50,
        nightDriving: 55,
        highwayDriving: 55,
        examFee: 150,
        theoryExam: 80,
      },
      packages: {
        basicPackage: { enabled: true, name: "Basic Package", description: "Standard driving course for beginners", price: 1299, lessons: 20, theoryLessons: 14 },
        intensivePackage: { enabled: true, name: "Intensive Package", description: "Fast-track course with more lessons per week", price: 1599, lessons: 25, theoryLessons: 14 },
        premiumPackage: { enabled: false, name: "Premium Package", description: "Comprehensive course with additional services", price: 1899, lessons: 30, theoryLessons: 14 },
      },
      discounts: {
        studentDiscount: { enabled: true, percentage: 5 },
        groupDiscount: { enabled: true, percentage: 10 },
        seasonalDiscount: { enabled: false, percentage: 7 },
      },
    });
  } catch (error) {
    console.error('Get pricing error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update school pricing
exports.updateSchoolPricing = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const updateData = req.body;
    delete updateData.email; // Remove email from update data to avoid overwriting

    const school = await School.findOneAndUpdate(
      { email },
      { $set: { pricing: updateData } },
      { new: true, runValidators: true }
    );

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    return res.status(200).json({ message: 'Pricing updated successfully' });
  } catch (error) {
    console.error('Update pricing error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};const School = require('../models/School');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1873837987897328784789268926764782678642647826288';

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Register a new school
exports.registerSchool = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    let { email, password, confirmPassword, services, prices, openingHours, ...schoolData } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingSchool = await School.findOne({ email });
    if (existingSchool) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    console.log('Raw services:', services);
    if (typeof services === 'string') {
      services = JSON.parse(services);
      console.log('Parsed services:', services);
    }
    console.log('Raw prices:', prices);
    if (typeof prices === 'string') {
      prices = JSON.parse(prices);
      console.log('Parsed prices:', prices);
    }
    console.log('Raw openingHours:', openingHours);
    if (typeof openingHours === 'string') {
      openingHours = JSON.parse(openingHours);
      console.log('Parsed openingHours:', openingHours);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const logo = req.files?.logo ? `/uploads/${req.files.logo[0].filename}` : null;
    const businessLicense = req.files?.businessLicense ? `/uploads/${req.files.businessLicense[0].filename}` : null;
    const photos = req.files?.photos ? req.files.photos.map(file => `/uploads/${file.filename}`) : [];

    const newSchool = new School({
      ...schoolData,
      email,
      password: hashedPassword,
      services,
      prices,
      openingHours,
      logo,
      businessLicense,
      photos,
    });

    console.log('Attempting to save new school...');
    const savePromise = newSchool.save();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Save operation timed out after 10 seconds')), 10000);
    });

    await Promise.race([savePromise, timeoutPromise]);
    console.log('School saved successfully');

    return res.status(201).json({ 
      message: 'School registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login a school
// exports.loginSchool = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const school = await School.findOne({ email });
//     if (!school) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, school.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     return res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
// Update the login controller
exports.loginSchool = async (req, res) => {
  try {
    const { email, password } = req.body;

    const school = await School.findOne({ email });
    if (!school) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, school.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: school._id, email: school.email },
      JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    return res.status(200).json({ 
      message: 'Login successful',
      token,
      school: {
        id: school._id,
        name: school.name,
        email: school.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create middleware to verify JWT token
exports.authMiddleware = (req, res, next) => {
  try {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add school data to request
    req.school = decoded;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const schools = await School.find();

    const totalSchools = schools.length;

    const servicesCount = {
      carLicense: 0,
      motorcycleLicense: 0,
      truckLicense: 0,
      busLicense: 0,
      mopedLicense: 0,
      trailerLicense: 0,
      refresherCourses: 0,
      intensiveCourses: 0,
      foreignLanguageSupport: 0,
      anxietySupport: 0,
      automaticTransmission: 0,
      onlineTheory: 0,
    };
    schools.forEach(school => {
      Object.keys(servicesCount).forEach(service => {
        if (school.services[service]) servicesCount[service]++;
      });
    });

    const schoolsByCity = {};
    schools.forEach(school => {
      schoolsByCity[school.city] = (schoolsByCity[school.city] || 0) + 1;
    });

    const foundedYearTrend = {};
    schools.forEach(school => {
      if (school.foundedYear) {
        foundedYearTrend[school.foundedYear] = (foundedYearTrend[school.foundedYear] || 0) + 1;
      }
    });

    const priceFields = [
      'registrationFee', 'theoryLesson', 'drivingLesson', 'examFee',
      'theoryExam', 'nightDriving', 'highwayDriving'
    ];
    const avgPrices = {};
    const minPrices = {};
    const maxPrices = {};
    priceFields.forEach(field => {
      const values = schools.map(school => school.prices[field]).filter(val => val !== undefined);
      avgPrices[field] = values.length ? (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2) : 0;
      minPrices[field] = values.length ? Math.min(...values) : 0;
      maxPrices[field] = values.length ? Math.max(...values) : 0;
    });

    const avgInstructors = schools.length ? (schools.reduce((sum, school) => sum + school.instructors, 0) / schools.length).toFixed(2) : 0;
    const avgVehicles = schools.length ? (schools.reduce((sum, school) => sum + school.vehicles, 0) / schools.length).toFixed(2) : 0;

    const weekendAvailability = {
      openSaturday: 0,
      openSunday: 0,
      closedWeekends: 0,
    };
    schools.forEach(school => {
      const isSaturdayOpen = school.openingHours?.saturday && !school.openingHours.saturday.closed;
      const isSundayOpen = school.openingHours?.sunday && !school.openingHours.sunday.closed;
      if (isSaturdayOpen && isSundayOpen) {
        weekendAvailability.openSaturday++;
        weekendAvailability.openSunday++;
      } else if (isSaturdayOpen) {
        weekendAvailability.openSaturday++;
      } else if (isSundayOpen) {
        weekendAvailability.openSunday++;
      } else {
        weekendAvailability.closedWeekends++;
      }
    });

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const avgOpeningHours = {};
    days.forEach(day => {
      const openTimes = [];
      const closeTimes = [];
      schools.forEach(school => {
        if (school.openingHours?.[day] && !school.openingHours[day].closed) {
          if (school.openingHours[day].open) openTimes.push(school.openingHours[day].open);
          if (school.openingHours[day].close) closeTimes.push(school.openingHours[day].close);
        }
      });

      const avgTime = (times) => {
        if (!times.length) return 'N/A';
        const minutes = times.map(time => {
          const [hours, mins] = time.split(':').map(Number);
          return hours * 60 + mins;
        });
        const avgMinutes = minutes.reduce((sum, val) => sum + val, 0) / minutes.length;
        const hours = Math.floor(avgMinutes / 60);
        const mins = Math.round(avgMinutes % 60);
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
      };

      avgOpeningHours[day] = {
        open: avgTime(openTimes),
        close: avgTime(closeTimes),
      };
    });

    return res.status(200).json({
      totalSchools,
      servicesCount,
      schoolsByCity,
      foundedYearTrend,
      avgPrices,
      minPrices,
      maxPrices,
      avgInstructors,
      avgVehicles,
      weekendAvailability,
      avgOpeningHours,
      schools: schools.map(school => ({
        name: school.name,
        city: school.city,
        instructors: school.instructors,
        vehicles: school.vehicles,
      })),
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get school profile
exports.getSchoolProfile = async (req, res) => {
  try {
    // Email comes from the decoded token
    const { email } = req.school;

    // Find the school
    const school = await School.findOne({ email });
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    return res.status(200).json({
      name: school.name,
      email: school.email,
      phone: school.phone,
      address: school.address,
      city: school.city,
      postalCode: school.postalCode,
      state: school.state,
      website: school.website,
      description: school.description,
      foundedYear: school.foundedYear,
      instructors: school.instructors,
      vehicles: school.vehicles,
      logo: school.logo,
      photos: school.photos,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateSchoolProfile = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    // Email comes from the decoded token
    const { email } = req.school;

    // Find the school
    const school = await School.findOne({ email });
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    // Extract update data from body (excluding email)
    const updateData = req.body;

    // Parse stringified JSON fields if they exist
    if (typeof updateData.services === "string") {
      updateData.services = JSON.parse(updateData.services);
    }
    if (typeof updateData.prices === "string") {
      updateData.prices = JSON.parse(updateData.prices);
    }
    if (typeof updateData.openingHours === "string") {
      updateData.openingHours = JSON.parse(updateData.openingHours);
    }

    // Handle file uploads
    const updateFields = { ...updateData };

    if (req.files?.logo) {
      updateFields.logo = `/uploads/${req.files.logo[0].filename}`; // Fixed path case
    }

    if (req.files?.photos) {
      const newPhotos = req.files.photos.map((file) => `/uploads/${file.filename}`); // Fixed path case
      updateFields.photos = [...(school.photos || []), ...newPhotos]; // Append new photos
    }

    // Update the school
    const updatedSchool = await School.findOneAndUpdate(
      { email },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedSchool) {
      return res.status(404).json({ message: "School not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
// const express = require('express');
// const router = express.Router();
// const schoolController = require('../controllers/schoolController');

// // School registration route
// router.post('/register', schoolController.registerSchool);

// // School login route
// router.post('/login', schoolController.loginSchool);

// module.exports = router;


const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const pricingController = require('../controllers/schoolPricingController');


router.post('/register', schoolController.registerSchool);

router.post('/login', schoolController.loginSchool);

// New endpoint for dashboard data
router.get('/dashboard', schoolController.getDashboardData);


router.get('/profile', schoolController.authMiddleware, schoolController.getSchoolProfile);
router.put('/profile', schoolController.authMiddleware, schoolController.updateSchoolProfile);

router.get('/pricing', pricingController.getSchoolPricing);
router.put('/pricing', pricingController.updateSchoolPricing);

module.exports = router;// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const schoolRoutes = require('./routes/schoolRoutes');

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect('mongodb+srv://anszeshan786:ans123@anscluster.ls7ac19.mongodb.net/DSF', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log('MongoDB connection error:', err));

// // Routes
// app.use('/api/school', schoolRoutes);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const schoolRoutes = require('./routes/schoolRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Add cookie-parser middleware
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).fields([
  { name: 'logo', maxCount: 1 },
  { name: 'businessLicense', maxCount: 1 },
  { name: 'photos', maxCount: 5 },
]);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Apply multer middleware to routes that handle file uploads
app.use((req, res, next) => {
  if (req.path === '/api/school/register') {
    upload(req, res, next);
  } else {
    next();
  }
});

// MongoDB Connection
mongoose.connect('mongodb+srv://anszeshan786:ans123@anscluster.ls7ac19.mongodb.net/DSF', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/school', schoolRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the School Schema
const schoolSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  foundedYear: { type: String },
  city: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  state: { type: String, required: true },
  website: { type: String },
  description: { type: String, required: true },
  services: {
    carLicense: { type: Boolean, default: false },
    motorcycleLicense: { type: Boolean, default: false },
    truckLicense: { type: Boolean, default: false },
    busLicense: { type: Boolean, default: false },
    mopedLicense: { type: Boolean, default: false },
    trailerLicense: { type: Boolean, default: false },
    refresherCourses: { type: Boolean, default: false },
    intensiveCourses: { type: Boolean, default: false },
    foreignLanguageSupport: { type: Boolean, default: false },
    anxietySupport: { type: Boolean, default: false },
    automaticTransmission: { type: Boolean, default: false },
    onlineTheory: { type: Boolean, default: false },
  },
  prices: {
    registrationFee: { type: Number, required: true },
    theoryLesson: { type: Number, required: true },
    drivingLesson: { type: Number, required: true },
    examFee: { type: Number, required: true },
    theoryExam: { type: Number, required: true },
    nightDriving: { type: Number, required: true },
    highwayDriving: { type: Number, required: true },
  },
  instructors: { type: Number, required: true },
  vehicles: { type: Number, required: true },
  openingHours: {
    monday: { open: String, close: String, closed: Boolean },
    tuesday: { open: String, close: String, closed: Boolean },
    wednesday: { open: String, close: String, closed: Boolean },
    thursday: { open: String, close: String, closed: Boolean },
    friday: { open: String, close: String, closed: Boolean },
    saturday: { open: String, close: String, closed: Boolean },
    sunday: { open: String, close: String, closed: Boolean },
  },
  logo: { type: String },
  businessLicense: { type: String },
  photos: [{ type: String }],
  termsAgreed: { type: Boolean, required: true },
  certify: { type: Boolean, required: true },
});

module.exports = mongoose.model('School', schoolSchema);  i want my pricing page also dynamic. Pls make one single page and do all updation what wants in it, not single page for each operation like services, pricing and profile. 
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Upload, CheckCircle } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SchoolDashboardLayout from "@/components/school-dashboard-layout";

export default function SchoolProfilePage() {
  const [school, setSchool] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Get token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (!token) {
      // Redirect to login if no token is found
      router.push("/school/login");
      return;
    }

    const fetchSchoolProfile = async () => {
      try {
        const response = await axios.get("https://backend-ds-blue.vercel.app/api/school/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchool(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          // Unauthorized, redirect to login
          router.push("/school/login");
        } else {
          setError("Failed to load profile data");
          setLoading(false);
        }
      }
    };
    fetchSchoolProfile();
  }, [token, router]);

  const handleSchoolChange = (field, value) => {
    setSchool({
      ...school,
      [field]: value,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Logo file size exceeds 2MB");
        return;
      }
      setLogoFile(file);
      setError(null);
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    const totalPhotos = (school.photos?.length || 0) + files.length;
    if (totalPhotos > 10) {
      setError("You can upload a maximum of 10 photos");
      return;
    }
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError("One or more photos exceed the 5MB file size limit");
      return;
    }
    setPhotoFiles(files);
    setError(null);
  };

  const handleSave = async () => {
    if (!token) {
      setError("No authentication token found. Please log in again.");
      router.push("/school/login");
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      const formData = new FormData();
      Object.keys(school).forEach((key) => {
        if (key !== "logo" && key !== "photos") {
          formData.append(key, school[key] || "");
        }
      });

      if (logoFile) {
        formData.append("logo", logoFile);
      }
      photoFiles.forEach((file) => {
        formData.append("photos", file);
      });

      await axios.put("https://backend-ds-blue.vercel.app/api/school/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh profile data after saving
      const response = await axios.get("https://backend-ds-blue.vercel.app/api/school/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchool(response.data);
      setLogoFile(null);
      setPhotoFiles([]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      if (err.response?.status === 401) {
        router.push("/school/login");
      } else {
        setError(err.response?.data?.message || "Failed to save profile");
        console.error("Save error:", err.response?.data || err.message);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!school) return <div className="text-center py-10 text-red-500">{error || "School not found"}</div>;

  return (
    <SchoolDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">School Profile</h1>
        <Button onClick={handleSave} disabled={isSaving} className="bg-rose-500 hover:bg-rose-600">
          {isSaving ? "Saving..." : "Save Changes"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {saveSuccess && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your profile has been updated successfully.</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-red-50 text-red-600 border-red-200">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>School Information</CardTitle>
            <CardDescription>Update your driving school's basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">School Name</Label>
                <Input id="name" value={school.name} onChange={(e) => handleSchoolChange("name", e.target.value)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={school.email}
                    onChange={(e) => handleSchoolChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={school.phone}
                    onChange={(e) => handleSchoolChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={school.address}
                  onChange={(e) => handleSchoolChange("address", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={school.city} onChange={(e) => handleSchoolChange("city", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={school.postalCode}
                    onChange={(e) => handleSchoolChange("postalCode", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={school.state} onValueChange={(value) => handleSchoolChange("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="berlin">Berlin</SelectItem>
                      <SelectItem value="bavaria">Bavaria</SelectItem>
                      <SelectItem value="hamburg">Hamburg</SelectItem>
                      <SelectItem value="nrw">North Rhine-Westphalia</SelectItem>
                      <SelectItem value="hesse">Hesse</SelectItem>
                      <SelectItem value="bw">Baden-Württemberg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={school.website || ""}
                    onChange={(e) => handleSchoolChange("website", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundedYear">Year Founded</Label>
                  <Input
                    id="foundedYear"
                    value={school.foundedYear || ""}
                    onChange={(e) => handleSchoolChange("foundedYear", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructors">Number of Instructors</Label>
                  <Input
                    id="instructors"
                    type="number"
                    value={school.instructors}
                    onChange={(e) => handleSchoolChange("instructors", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicles">Number of Vehicles</Label>
                  <Input
                    id="vehicles"
                    type="number"
                    value={school.vehicles}
                    onChange={(e) => handleSchoolChange("vehicles", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="min-h-[120px]"
                  value={school.description}
                  onChange={(e) => handleSchoolChange("description", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>School Media</CardTitle>
            <CardDescription>Upload your school logo and photos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">School Logo</h3>
                <div className="flex items-center gap-6">
                  <div className="border rounded-md overflow-hidden w-24 h-24 flex items-center justify-center bg-muted">
                    {logoFile ? (
                      <Image
                        src={URL.createObjectURL(logoFile)}
                        alt="School logo preview"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    ) : school.logo ? (
                      <Image
                        src={`http://localhost:5000${school.logo}`}
                        alt="School logo"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        alt="School logo placeholder"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Label htmlFor="logo-upload">
                      <Button variant="outline" asChild className="flex items-center cursor-pointer">
                        <div>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload New Logo
                        </div>
                      </Button>
                    </Label>
                    <p className="text-xs text-muted-foreground">Recommended size: 400x400px. Max file size: 2MB.</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">School Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {school.photos?.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="border rounded-md overflow-hidden aspect-square flex items-center justify-center bg-muted">
                        <Image
                          src={`http://localhost:5000${photo}`}
                          alt={`School photo ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                  {photoFiles.map((file, index) => (
                    <div key={`new-${index}`} className="relative group">
                      <div className="border rounded-md overflow-hidden aspect-square flex items-center justify-center bg-muted">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`New photo ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotosChange}
                  className="hidden"
                  id="photos-upload"
                />
                <Label htmlFor="photos-upload">
                  <Button variant="outline" asChild className="flex items-center cursor-pointer">
                    <div>
                      <Upload className="mr-2 h-4 w-4" />
                      Add More Photos
                    </div>
                  </Button>
                </Label>
                <p className="text-xs text-muted-foreground mt-2">
                  You can upload up to 10 photos. Recommended size: 1200x800px. Max file size: 5MB per photo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SchoolDashboardLayout>
  );
} "use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash, Edit, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import SchoolDashboardLayout from "@/components/school-dashboard-layout"

export default function ServicesPage() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Car License (B)",
      description: "Standard driving license for cars and light vehicles up to 3.5 tons.",
      active: true,
    },
    {
      id: 2,
      name: "Motorcycle License (A)",
      description: "License for motorcycles of all engine sizes.",
      active: true,
    },
    {
      id: 3,
      name: "Refresher Courses",
      description: "Courses for those who already have a license but need to refresh their skills.",
      active: true,
    },
    {
      id: 4,
      name: "Intensive Courses",
      description: "Accelerated learning program to get your license in a shorter time frame.",
      active: true,
    },
  ])

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    active: true,
  })

  const [editingService, setEditingService] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleAddService = () => {
    const id = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1
    setServices([...services, { ...newService, id }])
    setNewService({ name: "", description: "", active: true })
    setIsAddDialogOpen(false)
    showSuccessMessage()
  }

  const handleEditService = () => {
    setServices(services.map((service) => (service.id === editingService.id ? editingService : service)))
    setIsEditDialogOpen(false)
    showSuccessMessage()
  }

  const handleDeleteService = () => {
    setServices(services.filter((service) => service.id !== serviceToDelete))
    setIsDeleteDialogOpen(false)
    showSuccessMessage()
  }

  const handleToggleActive = (id) => {
    setServices(services.map((service) => (service.id === id ? { ...service, active: !service.active } : service)))
    showSuccessMessage()
  }

  const showSuccessMessage = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <SchoolDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rose-500 hover:bg-rose-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Add a new service that your driving school offers</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="e.g. Car License (B)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Describe what this service includes"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newService.active}
                  onCheckedChange={(checked) => setNewService({ ...newService, active: checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService} disabled={!newService.name}>
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {saveSuccess && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-green-50 text-green-600 border-green-200">
            <Check className="h-4 w-4 mr-2" />
            <AlertDescription>Changes saved successfully!</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Services</CardTitle>
          <CardDescription>Manage the services your driving school offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No services added yet. Click "Add Service" to get started.
              </div>
            ) : (
              services.map((service) => (
                <div key={service.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">{service.name}</h3>
                      <div
                        className={`ml-2 px-2 py-0.5 text-xs rounded-full ${service.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {service.active ? "Active" : "Inactive"}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleToggleActive(service.id)}>
                      {service.active ? "Deactivate" : "Activate"}
                    </Button>
                    <Dialog
                      open={isEditDialogOpen && editingService?.id === service.id}
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open)
                        if (open) setEditingService(service)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Service</DialogTitle>
                          <DialogDescription>Update the details of this service</DialogDescription>
                        </DialogHeader>
                        {editingService && (
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Service Name</Label>
                              <Input
                                id="edit-name"
                                value={editingService.name}
                                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={editingService.description}
                                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                rows={3}
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="edit-active"
                                checked={editingService.active}
                                onCheckedChange={(checked) => setEditingService({ ...editingService, active: checked })}
                              />
                              <Label htmlFor="edit-active">Active</Label>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleEditService}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={isDeleteDialogOpen && serviceToDelete === service.id}
                      onOpenChange={(open) => {
                        setIsDeleteDialogOpen(open)
                        if (open) setServiceToDelete(service.id)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Service</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this service? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleDeleteService}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </SchoolDashboardLayout>
  )
}
AS this is my registration page "use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SchoolRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState("")
  const [files, setFiles] = useState({ logo: null, businessLicense: null, photos: [] })

  const [schoolData, setSchoolData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
    foundedYear: "",
    city: "",
    address: "",
    postalCode: "",
    state: "",
    website: "",
    description: "",
    services: {
      carLicense: true,
      motorcycleLicense: false,
      truckLicense: false,
      busLicense: false,
      mopedLicense: false,
      trailerLicense: false,
      refresherCourses: false,
      intensiveCourses: false,
      foreignLanguageSupport: false,
      anxietySupport: false,
      automaticTransmission: false,
      onlineTheory: false,
    },
    prices: {
      registrationFee: 100,
      theoryLesson: 15,
      drivingLesson: 50,
      examFee: 150,
      theoryExam: 80,
      nightDriving: 55,
      highwayDriving: 55,
    },
    instructors: 1,
    vehicles: 1,
    openingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "14:00", closed: false },
      sunday: { open: "10:00", close: "14:00", closed: true },
    },
    logo: null,
    businessLicense: null,
    photos: [],
    termsAgreed: false,
    certify: false,
  })

  const handleInputChange = (section, field, value) => {
    if (section) {
      setSchoolData({
        ...schoolData,
        [section]: {
          ...schoolData[section],
          [field]: value,
        },
      })
    } else {
      setSchoolData({
        ...schoolData,
        [field]: value,
      })
    }
  }

  const handleServiceChange = (service, checked) => {
    setSchoolData({
      ...schoolData,
      services: {
        ...schoolData.services,
        [service]: checked,
      },
    })
  }

  const handleFileChange = (field, e) => {
    const selectedFiles = e.target.files;
    if (field === 'photos') {
      setFiles({ ...files, photos: Array.from(selectedFiles) });
    } else {
      setFiles({ ...files, [field]: selectedFiles[0] });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const formData = new FormData();
      
      // Append all school data
      Object.keys(schoolData).forEach(key => {
        if (key === 'services' || key === 'prices' || key === 'openingHours') {
          formData.append(key, JSON.stringify(schoolData[key]));
        } else if (key !== 'logo' && key !== 'businessLicense' && key !== 'photos') {
          formData.append(key, schoolData[key]);
        }
      });

      // Append files
      if (files.logo) formData.append('logo', files.logo);
      if (files.businessLicense) formData.append('businessLicense', files.businessLicense);
      files.photos.forEach(photo => formData.append('photos', photo));

      const response = await fetch('https://backend-ds-blue.vercel.app/api/school/register', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setIsComplete(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const steps = [
    { number: 1, title: "Account Information" },
    { number: 2, title: "School Details" },
    { number: 3, title: "Services & Pricing" },
    { number: 4, title: "Opening Hours" },
    { number: 5, title: "Verification" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-rose-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Driving School Registration</CardTitle>
                <CardDescription className="text-rose-100">
                  Register your driving school to be listed on Fahrschulfinder
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isComplete ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-16 text-center px-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
                    <p className="text-muted-foreground mb-8 max-w-md">
                      Your driving school has been registered successfully. You can now log in to manage your profile
                      and pricing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/school/login">
                        <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                          Go to Login
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button size="lg" variant="outline">
                          Return to Home
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <div>
                    {error && (
                      <div className="bg-red-50 text-red-500 p-3 rounded-md m-6 text-sm border border-red-200">
                        {error}
                      </div>
                    )}
                    <div className="p-6 border-b">
                      <div className="flex justify-between items-center">
                        {steps.map((s) => (
                          <div key={s.number} className="flex flex-col items-center">
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                s.number === step
                                  ? "bg-rose-500 text-white"
                                  : s.number < step
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {s.number < step ? <CheckCircle className="h-5 w-5" /> : s.number}
                            </div>
                            <span
                              className={`text-xs mt-2 hidden sm:block ${
                                s.number === step ? "text-rose-500 font-medium" : "text-muted-foreground"
                              }`}
                            >
                              {s.title}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="relative h-2 bg-gray-200 rounded-full mt-4">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-rose-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                            <p className="text-muted-foreground mb-6">
                              Create your account to manage your driving school listing
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  placeholder="John"
                                  value={schoolData.firstName}
                                  onChange={(e) => handleInputChange(null, "firstName", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                  id="lastName"
                                  placeholder="Doe"
                                  value={schoolData.lastName}
                                  onChange={(e) => handleInputChange(null, "lastName", e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={schoolData.email}
                                onChange={(e) => handleInputChange(null, "email", e.target.value)}
                                required
                              />
                              <p className="text-xs text-muted-foreground">
                                We'll send a verification link to this email
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                placeholder="+49 123 456789"
                                value={schoolData.phone}
                                onChange={(e) => handleInputChange(null, "phone", e.target.value)}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="password">Password</Label>
                              <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={schoolData.password}
                                onChange={(e) => handleInputChange(null, "password", e.target.value)}
                                required
                              />
                              <p className="text-xs text-muted-foreground">
                                Must be at least 8 characters with a number and a special character
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirm Password</Label>
                              <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={schoolData.confirmPassword}
                                onChange={(e) => handleInputChange(null, "confirmPassword", e.target.value)}
                                required
                              />
                            </div>

                            <div className="flex items-start space-x-2 pt-2">
                              <Checkbox
                                id="terms"
                                checked={schoolData.termsAgreed}
                                onCheckedChange={(checked) => handleInputChange(null, "termsAgreed", checked)}
                                required
                              />
                              <Label htmlFor="terms" className="font-normal text-sm leading-tight">
                                I agree to the{" "}
                                <Link href="/terms" className="text-rose-500 hover:underline">
                                  Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-rose-500 hover:underline">
                                  Privacy Policy
                                </Link>
                              </Label>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h2 className="text-xl font-semibold mb-4">School Details</h2>
                            <p className="text-muted-foreground mb-6">
                              Tell us about your driving school and its location
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="schoolName">School Name</Label>
                              <Input
                                id="schoolName"
                                placeholder="Enter your driving school name"
                                value={schoolData.name}
                                onChange={(e) => handleInputChange(null, "name", e.target.value)}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="foundedYear">Year Founded</Label>
                              <Input
                                id="foundedYear"
                                type="number"
                                placeholder="e.g. 2010"
                                value={schoolData.foundedYear}
                                onChange={(e) => handleInputChange(null, "foundedYear", e.target.value)}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="instructors">Number of Instructors</Label>
                                <Input
                                  id="instructors"
                                  type="number"
                                  placeholder="e.g. 5"
                                  value={schoolData.instructors}
                                  onChange={(e) => handleInputChange(null, "instructors", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="vehicles">Number of Vehicles</Label>
                                <Input
                                  id="vehicles"
                                  type="number"
                                  placeholder="e.g. 8"
                                  value={schoolData.vehicles}
                                  onChange={(e) => handleInputChange(null, "vehicles", e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Select
                                value={schoolData.city}
                                onValueChange={(value) => handleInputChange(null, "city", value)}
                                required
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a city" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="berlin">Berlin</SelectItem>
                                  <SelectItem value="munich">Munich</SelectItem>
                                  <SelectItem value="hamburg">Hamburg</SelectItem>
                                  <SelectItem value="cologne">Cologne</SelectItem>
                                  <SelectItem value="frankfurt">Frankfurt</SelectItem>
                                  <SelectItem value="stuttgart">Stuttgart</SelectItem>
                                  <SelectItem value="dusseldorf">Düsseldorf</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="address">Street Address</Label>
                              <Input
                                id="address"
                                placeholder="Enter your street address"
                                value={schoolData.address}
                                onChange={(e) => handleInputChange(null, "address", e.target.value)}
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="postalCode">Postal Code</Label>
                                <Input
                                  id="postalCode"
                                  placeholder="e.g. 10115"
                                  value={schoolData.postalCode}
                                  onChange={(e) => handleInputChange(null, "postalCode", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Select
                                  value={schoolData.state}
                                  onValueChange={(value) => handleInputChange(null, "state", value)}
                                  required
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="berlin">Berlin</SelectItem>
                                    <SelectItem value="bavaria">Bavaria</SelectItem>
                                    <SelectItem value="hamburg">Hamburg</SelectItem>
                                    <SelectItem value="nrw">North Rhine-Westphalia</SelectItem>
                                    <SelectItem value="hesse">Hesse</SelectItem>
                                    <SelectItem value="bw">Baden-Württemberg</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="website">Website (Optional)</Label>
                              <Input
                                id="website"
                                placeholder="https://www.example.com"
                                value={schoolData.website}
                                onChange={(e) => handleInputChange(null, "website", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="description">School Description</Label>
                              <Textarea
                                id="description"
                                placeholder="Tell potential students about your driving school"
                                className="min-h-[120px]"
                                value={schoolData.description}
                                onChange={(e) => handleInputChange(null, "description", e.target.value)}
                                required
                              />
                              <p className="text-xs text-muted-foreground">
                                Describe your school's specialties, teaching philosophy, and what makes you unique
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h2 className="text-xl font-semibold mb-4">Services & Pricing</h2>
                            <p className="text-muted-foreground mb-6">
                              Tell us about the services you offer and your pricing structure
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>License Types Offered</Label>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseB"
                                    checked={schoolData.services.carLicense}
                                    onCheckedChange={(checked) => handleServiceChange("carLicense", checked)}
                                  />
                                  <Label htmlFor="licenseB" className="font-normal">
                                    Car License (B)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseA"
                                    checked={schoolData.services.motorcycleLicense}
                                    onCheckedChange={(checked) => handleServiceChange("motorcycleLicense", checked)}
                                  />
                                  <Label htmlFor="licenseA" className="font-normal">
                                    Motorcycle License (A)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseC"
                                    checked={schoolData.services.truckLicense}
                                    onCheckedChange={(checked) => handleServiceChange("truckLicense", checked)}
                                  />
                                  <Label htmlFor="licenseC" className="font-normal">
                                    Truck License (C)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseD"
                                    checked={schoolData.services.busLicense}
                                    onCheckedChange={(checked) => handleServiceChange("busLicense", checked)}
                                  />
                                  <Label htmlFor="licenseD" className="font-normal">
                                    Bus License (D)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseAM"
                                    checked={schoolData.services.mopedLicense}
                                    onCheckedChange={(checked) => handleServiceChange("mopedLicense", checked)}
                                  />
                                  <Label htmlFor="licenseAM" className="font-normal">
                                    Moped License (AM)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseE"
                                    checked={schoolData.services.trailerLicense}
                                    onCheckedChange={(checked) => handleServiceChange("trailerLicense", checked)}
                                  />
                                  <Label htmlFor="licenseE" className="font-normal">
                                    Trailer License (BE)
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Additional Services</Label>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="refresher"
                                    checked={schoolData.services.refresherCourses}
                                    onCheckedChange={(checked) => handleServiceChange("refresherCourses", checked)}
                                  />
                                  <Label htmlFor="refresher" className="font-normal">
                                    Refresher Courses
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="intensive"
                                    checked={schoolData.services.intensiveCourses}
                                    onCheckedChange={(checked) => handleServiceChange("intensiveCourses", checked)}
                                  />
                                  <Label htmlFor="intensive" className="font-normal">
                                    Intensive Courses
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="foreign"
                                    checked={schoolData.services.foreignLanguageSupport}
                                    onCheckedChange={(checked) =>
                                      handleServiceChange("foreignLanguageSupport", checked)
                                    }
                                  />
                                  <Label htmlFor="foreign" className="font-normal">
                                    Foreign Language Support
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="anxiety"
                                    checked={schoolData.services.anxietySupport}
                                    onCheckedChange={(checked) => handleServiceChange("anxietySupport", checked)}
                                  />
                                  <Label htmlFor="anxiety" className="font-normal">
                                    Anxiety Support
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="automatic"
                                    checked={schoolData.services.automaticTransmission}
                                    onCheckedChange={(checked) => handleServiceChange("automaticTransmission", checked)}
                                  />
                                  <Label htmlFor="automatic" className="font-normal">
                                    Automatic Transmission
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="online"
                                    checked={schoolData.services.onlineTheory}
                                    onCheckedChange={(checked) => handleServiceChange("onlineTheory", checked)}
                                  />
                                  <Label htmlFor="online" className="font-normal">
                                    Online Theory Lessons
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 border-t">
                              <h3 className="font-medium mb-4">Basic Pricing Information</h3>
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="registrationFee">Registration Fee (€)</Label>
                                    <Input
                                      id="registrationFee"
                                      type="number"
                                      placeholder="e.g. 100"
                                      value={schoolData.prices.registrationFee}
                                      onChange={(e) => handleInputChange("prices", "registrationFee", e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="theoryLesson">Theory Lesson (€)</Label>
                                    <Input
                                      id="theoryLesson"
                                      type="number"
                                      placeholder="e.g. 15"
                                      value={schoolData.prices.theoryLesson}
                                      onChange={(e) => handleInputChange("prices", "theoryLesson", e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="drivingLesson">Driving Lesson (€)</Label>
                                    <Input
                                      id="drivingLesson"
                                      type="number"
                                      placeholder="e.g. 50"
                                      value={schoolData.prices.drivingLesson}
                                      onChange={(e) => handleInputChange("prices", "drivingLesson", e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="examFee">Practical Exam Fee (€)</Label>
                                    <Input
                                      id="examFee"
                                      type="number"
                                      placeholder="e.g. 150"
                                      value={schoolData.prices.examFee}
                                      onChange={(e) => handleInputChange("prices", "examFee", e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="nightDriving">Night Driving Lesson (€)</Label>
                                    <Input
                                      id="nightDriving"
                                      type="number"
                                      placeholder="e.g. 55"
                                      value={schoolData.prices.nightDriving}
                                      onChange={(e) => handleInputChange("prices", "nightDriving", e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="highwayDriving">Highway Driving Lesson (€)</Label>
                                    <Input
                                      id="highwayDriving"
                                      type="number"
                                      placeholder="e.g. 55"
                                      value={schoolData.prices.highwayDriving}
                                      onChange={(e) => handleInputChange("prices", "highwayDriving", e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                You can add more detailed pricing information in your dashboard after registration
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
                            <p className="text-muted-foreground mb-6">Set your driving school's operating hours</p>
                          </div>

                          <div className="space-y-4">
                            {Object.entries(schoolData.openingHours).map(([day, hours]) => (
                              <div key={day} className="flex items-center justify-between border-b pb-4 last:border-0">
                                <div className="w-1/4">
                                  <Label className="font-medium capitalize">{day}</Label>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center">
                                    <Checkbox
                                      id={`${day}-open`}
                                      checked={!hours.closed}
                                      onCheckedChange={(checked) =>
                                        handleInputChange("openingHours", day, {
                                          ...hours,
                                          closed: !checked,
                                        })
                                      }
                                    />
                                    <Label htmlFor={`${day}-open`} className="ml-2">
                                      {hours.closed ? "Closed" : "Open"}
                                    </Label>
                                  </div>
                                  {!hours.closed && (
                                    <div className="flex items-center gap-2">
                                      <Input
                                        type="time"
                                        value={hours.open}
                                        onChange={(e) =>
                                          handleInputChange("openingHours", day, {
                                            ...hours,
                                            open: e.target.value,
                                          })
                                        }
                                        className="w-32"
                                      />
                                      <span>to</span>
                                      <Input
                                        type="time"
                                        value={hours.close}
                                        onChange={(e) =>
                                          handleInputChange("openingHours", day, {
                                            ...hours,
                                            close: e.target.value,
                                          })
                                        }
                                        className="w-32"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {step === 5 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h2 className="text-xl font-semibold mb-4">Verification & Media</h2>
                            <p className="text-muted-foreground mb-6">
                              Upload documents to verify your business and add media to showcase your school
                            </p>
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label htmlFor="logo">School Logo</Label>
                              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">Drag and drop your logo here</p>
                                <p className="text-xs text-muted-foreground mb-4">PNG, JPG or SVG (max. 2MB)</p>
                                <Input
                                  id="logo"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileChange('logo', e)}
                                  className="hidden"
                                />
                                <label htmlFor="logo">
                                  <Button variant="outline" size="sm" type="button">
                                    Select File
                                  </Button>
                                </label>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="businessLicense">Business License or Registration</Label>
                              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">
                                  Upload your business license or registration document
                                </p>
                                <p className="text-xs text-muted-foreground mb-4">PDF, JPG or PNG (max. 5MB)</p>
                                <Input
                                  id="businessLicense"
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={(e) => handleFileChange('businessLicense', e)}
                                  className="hidden"
                                />
                                <label htmlFor="businessLicense">
                                  <Button variant="outline" size="sm" type="button">
                                    Select File
                                  </Button>
                                </label>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                This document will be used to verify your business and will not be publicly visible
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="photos">School Photos (Optional)</Label>
                              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">
                                  Add photos of your facilities, vehicles, or instructors
                                </p>
                                <p className="text-xs text-muted-foreground mb-4">
                                  JPG or PNG (max. 5 photos, 2MB each)
                                </p>
                                <Input
                                  id="photos"
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) => handleFileChange('photos', e)}
                                  className="hidden"
                                />
                                <label htmlFor="photos">
                                  <Button variant="outline" size="sm" type="button">
                                    Select Files
                                  </Button>
                                </label>
                              </div>
                            </div>

                            <div className="pt-4">
                              <div className="flex items-start space-x-2">
                                <Checkbox
                                  id="certify"
                                  checked={schoolData.certify}
                                  onCheckedChange={(checked) => handleInputChange(null, "certify", checked)}
                                  required
                                />
                                <Label htmlFor="certify" className="font-normal text-sm leading-tight">
                                  I certify that I am authorized to register this driving school and that all
                                  information provided is accurate and complete. I understand that providing false
                                  information may result in the removal of my listing.
                                </Label>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex justify-between mt-8">
                        {step > 1 ? (
                          <Button type="button" variant="outline" onClick={prevStep}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                          </Button>
                        ) : (
                          <div></div>
                        )}

                        {step < steps.length ? (
                          <Button type="button" onClick={nextStep} className="bg-rose-500 hover:bg-rose-600">
                            Next
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        ) : (
                          <Button type="submit" disabled={isSubmitting} className="bg-rose-500 hover:bg-rose-600">
                            {isSubmitting ? "Registering..." : "Complete Registration"}
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/school/login" className="text-rose-500 hover:underline font-medium">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}   
 make single page and use token for fetching information what user register and user can update any of the info. Make single page like registration page for updation , do it. 




 