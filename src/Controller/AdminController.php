<?php

namespace App\Controller;

use App\Entity\Chapitre;
use App\Entity\Image;
use App\Form\ChapitreType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(Request $request)
    {
        $chapitre = new Chapitre;
        $img = new Image;
        $formImg = $this->createForm(ImageType::class,$img);
        $formChap = $this->createForm(ChapitreType::class,$chapitre);
        $formChap->handleRequest($request);
        $formImg->handleRequest($request);
        if ($formChap->isSubmitted() && $formChap->isValid()) {
            $chapitre->setDate(new \DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($chapitre);
            $entityManager->flush();
        }
        if ($formImg->isSubmitted() && $formImg->isValid()) {
            $img->setDate(new \DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($chapitre);
            $entityManager->flush();
        }
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
            'Chapitre' =>$formChap->createView()
        ]);
    }
}
